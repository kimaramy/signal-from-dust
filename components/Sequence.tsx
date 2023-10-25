'use client';

import React, { useEffect, useRef, useState } from 'react';
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
import { getMonthKey, MonthKey, translateMonth } from '@/components/month';
import { translateWeekday } from '@/components/weekday';
import { getYearKey, translateYear, YearKey } from '@/components/year';

import Scene, { getSceneLength, SceneData } from './Scene';

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

export interface SequenceProps {
  id: string;
  collection: Collection;
  display: Display;
  dataset?: SceneData[];
  disabled?: boolean;
}

export default function Sequence({
  id,
  collection,
  display,
  dataset,
  disabled = false,
}: SequenceProps) {
  const safeDataset = dataset ?? getFallbackSceneDataList(collection);

  const decimals = safeDataset.map((data) => data.value ?? 0);

  const sequenceRef = useRef<HTMLDivElement>(null);

  const [sequence, sequenceControls] = useArrayState<SequenceData>(
    initSequence(id, safeDataset)
  );

  const [currentScene, setCurrentScene] = useState<SequenceData>(sequence[0]);

  useEffect(() => {
    // 데이터셋이 초기화 혹은 교체될 때
    if (dataset) {
      const sequence = initSequence(id, dataset);
      sequenceControls.setArray(sequence);
      setCurrentScene(sequence[0]);
      sequenceRef.current?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dataset]);

  return (
    <section
      id={id}
      ref={sequenceRef}
      className={cn(
        'w-full overflow-x-hidden overflow-y-scroll p-4 scrollbar-hide lg:px-6',
        display === '2d' ? 'h-minimap' : 'h-full'
      )}
    >
      <ul
        className={cn('h-full', display === '2d' && 'grid gap-1 lg:gap-2')}
        style={{
          gridTemplateRows:
            display === '2d'
              ? `repeat(${decimals.length}, minmax(2rem, 3rem))`
              : undefined,
        }}
      >
        {sequence.map((scene) => {
          return (
            <Scene
              key={scene.id}
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
                setCurrentScene({ ...sequence[sceneIndex], data: sceneData });
              }}
            />
          );
        })}
      </ul>
      <ul
        className="fixed bottom-[var(--player-height)] left-0 z-20 grid h-[3px] w-screen bg-black/20"
        style={{
          gridTemplateColumns: `repeat(${sequence.length}, 1fr)`,
        }}
      >
        {sequence.map((scene) => (
          <li
            key={scene.id}
            className={cn('h-full', scene.isPlayed && 'bg-red-500')}
          ></li>
        ))}
      </ul>
      {currentScene && (
        <footer className="fixed bottom-0 left-0 z-20 flex h-player w-screen items-center border-t border-t-[#dfd7cb] bg-[#dfd7cb]/80 px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded bg-black/20">
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
              <h3 className="text-lg font-bold">
                {[
                  currentScene.data.dates.join(' ') + '의',
                  currentScene.data.name,
                ].join(' ')}
              </h3>
              <h4 className="pl-px text-xs text-gray-900">
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
  );
}

function getFallbackSceneDataList(collection: Collection): SceneData[] {
  return new Array(getDataCount(collection)).fill(null).map((value, i) => ({
    id: i + 1,
    collection: translateCollection(collection),
    name: '초미세먼지',
    dates: ['...'],
    value,
    location: '서울시',
    rank: null,
  }));
}

export function toDailySceneDataList(
  dataset: DailyData[],
  collection: Collection
): SceneData[] {
  return dataset.map(({ id, month, day, pm_small }) => ({
    id,
    collection: translateCollection(collection),
    name: '초미세먼지',
    dates: [translateMonth(getMonthKey(month) as MonthKey), `${day}일`],
    value: pm_small,
    location: '서울시',
    rank: null,
  }));
}

export function toWeekDailySceneDataList(
  dataset: WeekDailyData[],
  collection: Collection
): SceneData[] {
  return dataset.map(({ id, month, weekday, pm_small }) => ({
    id,
    collection: translateCollection(collection),
    name: '초미세먼지',
    dates: [
      translateMonth(getMonthKey(month) as MonthKey),
      translateWeekday(weekday),
    ],
    value: pm_small,
    location: '서울시',
    rank: null,
  }));
}

export function toWeeklySceneDataList(
  dataset: WeeklyData[],
  collection: Collection
): SceneData[] {
  return dataset.map(({ id, year, week, pm_small, pm_large }) => ({
    id,
    collection: translateCollection(collection),
    name: '초미세먼지',
    dates: [translateYear(getYearKey(year) as YearKey), `${week}주차`],
    value: pm_large,
    location: '서울시',
    rank: null,
  }));
}

export function toMonthlySceneDataList(
  dataset: MonthlyData[],
  collection: Collection
): SceneData[] {
  return dataset.map(({ id, year, month, pm_small }) => ({
    id,
    collection: translateCollection(collection),
    name: '초미세먼지',
    dates: [
      translateYear(getYearKey(year) as YearKey),
      translateMonth(getMonthKey(month) as MonthKey),
    ],
    value: pm_small,
    location: '서울시',
    rank: null,
  }));
}

export function toYearlySceneDataList(
  dataset: YearlyData[],
  collection: Collection
): SceneData[] {
  return dataset.map(({ id, year, pm_small }) => ({
    id,
    collection: translateCollection(collection),
    name: '초미세먼지',
    dates: [translateYear(getYearKey(year) as YearKey)],
    value: pm_small,
    location: '서울시',
    rank: null,
  }));
}
