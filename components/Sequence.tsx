'use client';

import React from 'react';
import type {
  DailyData,
  DataUnit,
  MonthlyData,
  WeekDailyData,
  WeeklyData,
  YearlyData,
} from '@/domains/types';
import { getDataUnitCount } from '@/domains/utils';

import { cn, toMonthName, toOrdinalNumberName } from '@/lib/utils';
import type { Display } from '@/components/display';

import Scene, { getSceneLength, SceneData } from './Scene';

export interface SequenceProps {
  id: string;
  dataset?: SceneData[];
  display: Display;
  dataUnit?: DataUnit;
  disabled?: boolean;
}

export default function Sequence({
  id,
  display,
  dataset,
  dataUnit = 'daily',
  disabled = false,
}: SequenceProps) {
  const sequenceContext = [id];

  const safeDataset = dataset ?? getFallbackSceneDataList(dataUnit);

  const decimals = safeDataset.map((data) => data.value ?? 0);

  return (
    <section id={id} className="relative h-full w-full p-4 lg:p-6">
      <ul
        className={cn(
          'h-full gap-1 lg:gap-2',
          display === '2d' ? 'grid' : undefined
        )}
        style={{
          gridTemplateRows:
            display === '2d'
              ? `repeat(${decimals.length}, minmax(3rem, 1fr))`
              : undefined,
        }}
      >
        {safeDataset.map((data, i) => {
          const sceneContext = sequenceContext.concat(`${i}`);
          const sceneId = sceneContext.join('-');
          return (
            <Scene
              key={sceneId}
              id={sceneId}
              context={sceneContext}
              data={data}
              display={display}
              length={
                display === '2d'
                  ? getSceneLength(Math.max(...decimals))
                  : getSceneLength(data.value ?? 0)
              }
              active={i === 0}
            />
          );
        })}
      </ul>
    </section>
  );
}

function getFallbackSceneDataList(dataUnit: DataUnit): SceneData[] {
  return new Array(getDataUnitCount(dataUnit)).fill(null).map((value, i) => ({
    id: i + 1,
    label: 'TBD',
    value,
  }));
}

export function toDailySceneDataList(dataset: DailyData[]) {
  return dataset.map((data) => ({
    id: data.id,
    label: toOrdinalNumberName(data.day),
    value: data.pm_small,
  }));
}

export function toWeekDailySceneDataList(dataset: WeekDailyData[]) {
  return dataset.map((data) => ({
    id: data.id,
    label: data.weekday.slice(0, 3),
    value: data.pm_small,
  }));
}

export function toWeeklySceneDataList(dataset: WeeklyData[]) {
  return dataset.map((data) => ({
    id: data.id,
    label: toOrdinalNumberName(data.week),
    value: data.pm_small,
  }));
}

export function toMonthlySceneDataList(dataset: MonthlyData[]) {
  return dataset.map((data) => ({
    id: data.id,
    label: toMonthName(data.month, 'short'),
    value: data.pm_small,
  }));
}

export function toYearlySceneDataList(dataset: YearlyData[]) {
  return dataset.map((data) => ({
    id: data.id,
    label: data.year.toString(),
    value: data.pm_small,
  }));
}
