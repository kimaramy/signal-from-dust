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
  Collection,
  getDataCount,
  translateCollection,
} from '@/components/collection';
import type { Display } from '@/components/display';
import { DustSize, translateDustSize } from '@/components/dustSize';
import { getMonthKey, MonthKey, translateMonth } from '@/components/month';
import ProgressBar from '@/components/ProgressBar';
import Scene, { getSceneLength, SceneData } from '@/components/Scene';
import { translateWeekday } from '@/components/weekday';
import { getYearKey, translateYear, YearKey } from '@/components/year';

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
  collection: Collection;
  display: Display;
  dataset?: SceneData[];
  disabled?: boolean;
}

function Sequence({
  id,
  collection,
  display,
  dataset,
  disabled = false,
}: SequenceProps) {
  // const placeholdingDataset = getFallbackSceneDataList(collection);

  const decimals: number[] =
    dataset?.map((data) => data.value ?? 0) ??
    new Array(getDataCount(collection)).fill(0);

  const sequenceEl = useRef<HTMLUListElement>(null);

  const [progress, setProgress] = useState(0);

  const [sequence, sequenceControls] = useArrayState<SequenceData>([]);

  const [currentScene, setCurrentScene] = useState<SequenceData>(sequence[0]);

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
    setCurrentScene(sequence[0]);
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
        className={cn(display === '2d' && 'hidden')}
      />
      <section
        id={id}
        ref={sequenceEl}
        className={cn(
          'relative w-full overflow-x-hidden overflow-y-scroll pt-4 scrollbar-hide',
          display === '2d' &&
            'flex h-auto min-h-screen items-center px-4 pb-4 lg:px-6',
          display === '3d' && 'h-screen pb-[var(--player-height)]'
        )}
        onScroll={handleScroll}
      >
        <ul
          className={cn(
            'h-full w-full',
            display === '2d' && 'grid gap-1 lg:gap-2'
          )}
          style={{
            gridTemplateRows:
              display === '2d'
                ? `repeat(${decimals.length}, minmax(2.25rem, 1fr))`
                : undefined,
          }}
        >
          {sequence.length > 0
            ? sequence.map((scene) => {
                return (
                  <Scene
                    key={`${collection}-${display}-${scene.id}`}
                    className=""
                    sceneId={scene.id}
                    sceneData={scene.data}
                    sceneIndex={scene.index}
                    sceneLength={
                      display === '2d'
                        ? getSceneLength(Math.max(...decimals))
                        : getSceneLength(scene.data.value ?? 0)
                    }
                    display={display}
                    // active={index === 0}
                    onSceneChange={(sceneData, sceneIndex) => {
                      const prevSceneIndex = currentScene?.index ?? 0;
                      // const sceneGap = sceneIndex - prevSceneIndex;
                      if (prevSceneIndex < sceneIndex) {
                        //  바로 다음 씬으로 이동시, 바로 직전 씬 재생된 것으로 간주
                        sequenceControls.updateItemAtIndex(sceneIndex - 1, {
                          ...sequence[sceneIndex - 1],
                          isPlayed: true,
                        });
                        //
                      } else {
                        // 바로 이전 씬으로 이동시, 현재 씬 재생되지 않은 것으로 간주
                        sequenceControls.updateItemAtIndex(sceneIndex, {
                          ...sequence[sceneIndex],
                          isPlayed: false,
                        });
                      }
                      setCurrentScene({
                        ...sequence[sceneIndex],
                        data: sceneData,
                      });
                    }}
                  />
                );
              })
            : decimals.map((_, i) => (
                <Skeleton key={i} className="h-full w-full" />
              ))}
        </ul>
        {currentScene && (
          <footer
            className={cn(
              'fixed bottom-0 left-0 z-20 w-full',
              display === '2d' && 'hidden'
            )}
          >
            <div className="flex h-player items-center gap-3 border-t border-t-[#dfd7cb] bg-[#dfd7cb]/80 px-4 3xl:container dark:border-input dark:bg-body md:px-6 lg:px-8">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded bg-black/20 dark:bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-black/50"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-bold text-foreground">
                  {[
                    currentScene.data.dates.join(' ') + '의',
                    currentScene.data.displayName,
                  ].join(' ')}
                </h3>
                <h4 className="pl-px text-xs text-muted-foreground">
                  데이터 :{' '}
                  {[
                    `${currentScene.data.collection} (초)미세먼지 평균`,
                    `2015~2022년`,
                    currentScene.data.location,
                  ].join(', ')}
                </h4>
              </div>
            </div>
          </footer>
        )}
      </section>
    </>
  );
}

// function getFallbackSceneDataList(collection: Collection): SceneData[] {
//   return new Array(getDataCount(collection)).fill(null).map((value, i) => ({
//     id: i + 1,
//     collection: translateCollection(collection),
//     name: 'TBD',
//     dates: ['...'],
//     value: 0,
//     location: 'TBD',
//     rank: null,
//   }));
// }

export function toDailySceneDataList(
  dataset: DailyData[],
  collection: Collection,
  dataName: DustSize
): SceneData[] {
  return dataset.map(({ id, month, day, pm_large, pm_small }) => ({
    id,
    name: dataName,
    displayName: translateDustSize(dataName),
    value: dataName === 'lg' ? pm_large : pm_small,
    collection: translateCollection(collection),
    dates: [translateMonth(getMonthKey(month) as MonthKey), `${day}일`],
    location: '서울시',
    rank: null,
  }));
}

export function toWeekDailySceneDataList(
  dataset: WeekDailyData[],
  collection: Collection,
  dataName: DustSize
): SceneData[] {
  return dataset.map(({ id, month, weekday, pm_large, pm_small }) => ({
    id,
    name: dataName,
    displayName: translateDustSize(dataName),
    value: dataName === 'lg' ? pm_large : pm_small,
    collection: translateCollection(collection),
    dates: [
      translateMonth(getMonthKey(month) as MonthKey),
      translateWeekday(weekday),
    ],
    location: '서울시',
    rank: null,
  }));
}

export function toWeeklySceneDataList(
  dataset: WeeklyData[],
  collection: Collection,
  dataName: DustSize
): SceneData[] {
  return dataset.map(({ id, year, week, pm_large, pm_small }) => ({
    id,
    name: dataName,
    displayName: translateDustSize(dataName),
    value: dataName === 'lg' ? pm_large : pm_small,
    collection: translateCollection(collection),
    dates: [translateYear(getYearKey(year) as YearKey), `${week}번째 주`],
    location: '서울시',
    rank: null,
  }));
}

export function toMonthlySceneDataList(
  dataset: MonthlyData[],
  collection: Collection,
  dataName: DustSize
): SceneData[] {
  return dataset.map(({ id, year, month, pm_large, pm_small }) => ({
    id,
    name: dataName,
    displayName: translateDustSize(dataName),
    value: dataName === 'lg' ? pm_large : pm_small,
    collection: translateCollection(collection),
    dates: [
      translateYear(getYearKey(year) as YearKey),
      translateMonth(getMonthKey(month) as MonthKey),
    ],
    location: '서울시',
    rank: null,
  }));
}

export function toYearlySceneDataList(
  dataset: YearlyData[],
  collection: Collection,
  dataName: DustSize
): SceneData[] {
  return dataset.map(({ id, year, pm_large, pm_small }) => ({
    id,
    name: dataName,
    displayName: translateDustSize(dataName),
    value: dataName === 'lg' ? pm_large : pm_small,
    collection: translateCollection(collection),
    dates: [translateYear(getYearKey(year) as YearKey)],
    location: '서울시',
    rank: null,
  }));
}

export default Sequence;
