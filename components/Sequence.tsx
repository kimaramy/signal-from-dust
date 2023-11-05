'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import type {
  DailyData,
  MonthlyData,
  WeekDailyData,
  WeeklyData,
  YearlyData,
} from '@/domains/types';
import { useArrayState } from '@/hooks';

import { cn } from '@/lib/utils';
import {
  dataCollectionSchema,
  type DataCollectionKey,
} from '@/components/dataCollection';
import { dataNameSchema, type DataNameKey } from '@/components/dataName';
import { type DisplayKey } from '@/components/display';
import { monthSchema } from '@/components/month';
import ProgressBar from '@/components/ProgressBar';
import Scene, { getSceneLength, type SceneData } from '@/components/Scene';
import { weekdaySchema } from '@/components/weekday';
import { yearSchema } from '@/components/year';

import { Skeleton } from './ui/skeleton';

export interface SequenceData {
  id: string;
  index: number;
  data: SceneData;
  isPlaying: boolean;
  isPlayed: boolean;
}

function initSequence(sequenceId: string, sceneDataList: SceneData[]) {
  return sceneDataList.map<SequenceData>((sceneData, sceneIndex) => ({
    id: [sequenceId, sceneIndex].join('-'),
    index: sceneIndex,
    data: sceneData,
    isPlaying: false,
    isPlayed: false,
  }));
}

interface SequenceProps {
  id: string;
  dataCollectionKey: DataCollectionKey;
  displayKey: DisplayKey;
  dataset?: SceneData[];
  disabled?: boolean;
}

function Sequence({
  id,
  dataCollectionKey,
  displayKey,
  dataset,
  disabled = false,
}: SequenceProps) {
  const isFullDisplay = displayKey === 'FULL';

  const decimals: number[] =
    dataset?.map((data) => data.value ?? 0) ??
    new Array(dataCollectionSchema.getDataCount(dataCollectionKey)).fill(0);

  const sequenceEl = useRef<HTMLUListElement>(null);

  const [progress, setProgress] = useState(0);

  const [sequence, sequenceControls] = useArrayState<SequenceData>([]);

  // const [currentScene, setCurrentScene] = useState<SequenceData>(sequence[0]);

  const handleScroll = useCallback((e: React.UIEvent) => {
    // TODO: requestAnimationFrame으로 최적화
    const el = e.currentTarget;
    if (el) {
      const scrollTop = el.scrollTop; // 컨테이너의 스크롤 위치를 가져옵니다.
      const scrollHeight = el.scrollHeight - el.clientHeight; // 컨테이너의 전체 스크롤 가능한 높이를 가져옵니다.
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      const progress = 100 - scrollPercentage < 10 ? 100 : scrollPercentage;
      setProgress(progress);
    }
  }, []);

  useEffect(() => {
    if (!dataset) return;
    // 데이터셋이 초기화 혹은 교체될 때
    const sequence = initSequence(id, dataset);
    sequenceControls.setArray(sequence);
    // setCurrentScene(sequence[0]);
    sequenceEl.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dataset]);

  return (
    <>
      <ProgressBar
        value={progress}
        className={cn(!isFullDisplay && 'hidden')}
      />
      <section
        id={id}
        ref={sequenceEl}
        className={cn(
          'relative w-full overflow-x-hidden overflow-y-scroll pt-4 scrollbar-hide',
          !isFullDisplay &&
            'flex h-auto min-h-screen items-center px-4 pb-4 lg:px-6',
          isFullDisplay && 'h-screen pb-[var(--player-height)]'
        )}
        onScroll={handleScroll}
      >
        <ul
          className={cn(
            'h-full w-full',
            !isFullDisplay && 'grid gap-1 lg:gap-2'
          )}
          style={{
            gridTemplateRows: !isFullDisplay
              ? `repeat(${decimals.length}, minmax(2.25rem, 1fr))`
              : undefined,
          }}
        >
          {sequence.length > 0
            ? sequence.map((scene) => {
                return (
                  <Scene
                    key={`${dataCollectionKey}-${displayKey}-${scene.id}`}
                    displayKey={displayKey}
                    sceneId={scene.id}
                    sceneData={scene.data}
                    sceneIndex={scene.index}
                    sceneLength={
                      !isFullDisplay
                        ? getSceneLength(Math.max(...decimals))
                        : getSceneLength(scene.data.value ?? 0)
                    }
                    onSceneChange={(sceneData, sceneIndex) => {
                      // const prevSceneIndex = currentScene?.index ?? 0;
                      // // const sceneGap = sceneIndex - prevSceneIndex;
                      // if (prevSceneIndex < sceneIndex) {
                      //   //  바로 다음 씬으로 이동시, 바로 직전 씬 재생된 것으로 간주
                      //   sequenceControls.updateItemAtIndex(sceneIndex - 1, {
                      //     ...sequence[sceneIndex - 1],
                      //     isPlayed: true,
                      //   });
                      //   //
                      // } else {
                      //   // 바로 이전 씬으로 이동시, 현재 씬 재생되지 않은 것으로 간주
                      //   sequenceControls.updateItemAtIndex(sceneIndex, {
                      //     ...sequence[sceneIndex],
                      //     isPlayed: false,
                      //   });
                      // }
                      // setCurrentScene({
                      //   ...sequence[sceneIndex],
                      //   data: sceneData,
                      // });
                    }}
                  />
                );
              })
            : decimals.map((_, i) => (
                <Skeleton key={i} className="h-full w-full" />
              ))}
        </ul>
      </section>
    </>
  );
}

export function toDailySceneDataset(
  dataset: DailyData[],
  dataNameKey: DataNameKey,
  dataCollectionKey: DataCollectionKey
): SceneData[] {
  return dataset.map(({ id, month, day, pm_large, pm_small }) => ({
    id,
    name: dataNameKey,
    displayName: dataNameSchema.display(dataNameKey),
    value:
      dataNameKey === 'PM_LARGE'
        ? pm_large
        : dataNameKey === 'PM_SMALL'
        ? pm_small
        : null,
    collection: dataCollectionSchema.display(dataCollectionKey),
    dates: [monthSchema.display(monthSchema.getKeyByValue(month)), `${day}일`],
    location: '서울시',
    rank: null,
  }));
}

export function toWeekDailySceneDataset(
  dataset: WeekDailyData[],
  dataNameKey: DataNameKey,
  dataCollectionKey: DataCollectionKey
): SceneData[] {
  return dataset.map(({ id, month, weekday, pm_large, pm_small }) => ({
    id,
    name: dataNameKey,
    displayName: dataNameSchema.display(dataNameKey),
    value:
      dataNameKey === 'PM_LARGE'
        ? pm_large
        : dataNameKey === 'PM_SMALL'
        ? pm_small
        : null,
    collection: dataCollectionSchema.display(dataCollectionKey),
    dates: [
      monthSchema.display(monthSchema.getKeyByValue(month)),
      weekdaySchema.display(weekdaySchema.refineKey(weekday)),
    ],
    location: '서울시',
    rank: null,
  }));
}

export function toWeeklySceneDataset(
  dataset: WeeklyData[],
  dataNameKey: DataNameKey,
  dataCollectionKey: DataCollectionKey
): SceneData[] {
  return dataset.map(({ id, year, week, pm_large, pm_small }) => ({
    id,
    name: dataNameKey,
    displayName: dataNameSchema.display(dataNameKey),
    value:
      dataNameKey === 'PM_LARGE'
        ? pm_large
        : dataNameKey === 'PM_SMALL'
        ? pm_small
        : null,
    collection: dataCollectionSchema.display(dataCollectionKey),
    dates: [
      yearSchema.display(yearSchema.getKeyByValue(year)),
      `${week}번째 주`,
    ],
    location: '서울시',
    rank: null,
  }));
}

export function toMonthlySceneDataset(
  dataset: MonthlyData[],
  dataNameKey: DataNameKey,
  dataCollectionKey: DataCollectionKey
): SceneData[] {
  return dataset.map(({ id, year, month, pm_large, pm_small }) => ({
    id,
    name: dataNameKey,
    displayName: dataNameSchema.display(dataNameKey),
    value:
      dataNameKey === 'PM_LARGE'
        ? pm_large
        : dataNameKey === 'PM_SMALL'
        ? pm_small
        : null,
    collection: dataCollectionSchema.display(dataCollectionKey),
    dates: [
      yearSchema.display(yearSchema.getKeyByValue(year)),
      monthSchema.display(monthSchema.getKeyByValue(month)),
    ],
    location: '서울시',
    rank: null,
  }));
}

export function toYearlySceneDataset(
  dataset: YearlyData[],
  dataNameKey: DataNameKey,
  dataCollectionKey: DataCollectionKey
): SceneData[] {
  return dataset.map(({ id, year, pm_large, pm_small }) => ({
    id,
    name: dataNameKey,
    displayName: dataNameSchema.display(dataNameKey),
    value:
      dataNameKey === 'PM_LARGE'
        ? pm_large
        : dataNameKey === 'PM_SMALL'
        ? pm_small
        : null,
    collection: dataCollectionSchema.display(dataCollectionKey),
    dates: [yearSchema.display(yearSchema.getKeyByValue(year))],
    location: '서울시',
    rank: null,
  }));
}

export default Sequence;
