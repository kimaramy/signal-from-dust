/* eslint-disable tailwindcss/classnames-order */
'use client';

import React, { useEffect, useState } from 'react';
import type {
  DailyData,
  MonthlyData,
  WeekDailyData,
  WeeklyData,
  YearlyData,
} from '@/domains/types';
import { useUpdateEffect } from '@/hooks';

import { cn, toOrdinalNumberName } from '@/lib/utils';
import { Collection, getDataCount } from '@/components/collection';
import type { Display } from '@/components/display';
import {
  getMonthKey,
  toMonthName,
  toMonthSelectLabel,
} from '@/components/month';

import Scene, { getSceneLength, SceneData } from './Scene';
import { getYearKey, toYearName, toYearSelectLabel } from './year';

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
  const sequenceId = id;

  const safeDataset = dataset ?? getFallbackSceneDataList(collection);

  const decimals = safeDataset.map((data) => data.value ?? 0);

  const [sceneData, setSceneData] = useState<SceneData | undefined>(
    dataset?.[0]
  );

  useUpdateEffect(() => {
    if (dataset && dataset.length > 0) {
      setSceneData(dataset[0]);
    }
  }, [dataset]);

  return (
    <section
      id={id}
      className={cn(
        'scrollbar-hide w-full overflow-x-hidden overflow-y-scroll p-4 lg:px-6',
        display === '2d' ? 'h-minimap' : 'h-full'
      )}
    >
      <ul
        className={cn('h-full', display === '2d' && 'grid gap-1 lg:gap-2')}
        style={{
          gridTemplateRows:
            display === '2d'
              ? `repeat(${decimals.length}, minmax(2rem, 1fr))`
              : undefined,
        }}
      >
        {safeDataset.map((data, index) => {
          const sceneId = [sequenceId, index].join('-');
          return (
            <Scene
              key={sceneId}
              id={sceneId}
              data={data}
              dataIndex={index}
              display={display}
              length={
                display === '2d'
                  ? getSceneLength(Math.max(...decimals))
                  : getSceneLength(data.value ?? 0)
              }
              active={index === 0}
              onSceneChange={() => setSceneData(data)}
            />
          );
        })}
      </ul>
      {sceneData && (
        <footer className="h-player fixed bottom-0 left-0 z-20 flex w-screen items-center border-t bg-body px-4 md:px-6 lg:px-8">
          <h4 className="text-xl">
            {[sceneData.location, sceneData.date, sceneData.valueType].join(
              ', '
            )}
          </h4>
        </footer>
      )}
    </section>
  );
}

function getFallbackSceneDataList(collection: Collection): SceneData[] {
  return new Array(getDataCount(collection)).fill(null).map((value, i) => ({
    id: i + 1,
    location: 'Loading...',
    date: 'Loading...',
    value,
    valueType: '평균 초미세먼지',
    rank: null,
  }));
}

export function toDailySceneDataList(dataset: DailyData[]): SceneData[] {
  return dataset.map(({ id, month, day, pm_small }) => ({
    id,
    location: '서울시',
    date: [
      toMonthSelectLabel(getMonthKey(month)),
      toOrdinalNumberName(day),
    ].join(' '),
    value: pm_small,
    valueType: '평균 초미세먼지',
    rank: null,
  }));
}

export function toWeekDailySceneDataList(
  dataset: WeekDailyData[]
): SceneData[] {
  return dataset.map(({ id, month, weekday, pm_small }) => ({
    id,
    location: '서울시',
    date: [toMonthSelectLabel(getMonthKey(month)), weekday.slice(0, 3)].join(
      ' '
    ),
    value: pm_small,
    valueType: '평균 초미세먼지',
    rank: null,
  }));
}

export function toWeeklySceneDataList(dataset: WeeklyData[]): SceneData[] {
  return dataset.map(({ id, year, week, pm_small }) => ({
    id,
    location: '서울시',
    date: [toYearSelectLabel(getYearKey(year)), toOrdinalNumberName(week)].join(
      ' '
    ),
    value: pm_small,
    valueType: '평균 초미세먼지',
    rank: null,
  }));
}

export function toMonthlySceneDataList(dataset: MonthlyData[]): SceneData[] {
  return dataset.map(({ id, year, month, pm_small }) => ({
    id,
    location: '서울시',
    date: [
      toYearSelectLabel(getYearKey(year)),
      toMonthSelectLabel(getMonthKey(month)),
    ].join(' '),
    value: pm_small,
    valueType: '평균 초미세먼지',
    rank: null,
  }));
}

export function toYearlySceneDataList(dataset: YearlyData[]): SceneData[] {
  return dataset.map(({ id, year, pm_small }) => ({
    id,
    location: '서울시',
    date: [toYearSelectLabel(getYearKey(year))].join(' '),
    value: pm_small,
    valueType: '평균 초미세먼지',
    rank: null,
  }));
}
