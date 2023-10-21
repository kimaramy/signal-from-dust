'use client';

import React, { useEffect, useState } from 'react';
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

import Scene, { SceneData } from './Scene';
import type { View } from './ViewSelect';

export interface SequenceProps {
  id: string;
  dataset?: SceneData[];
  dataUnit?: DataUnit;
  view: View;
  disabled?: boolean;
}

export default function Sequence({
  id,
  dataset,
  dataUnit = 'daily',
  view,
  disabled = false,
}: SequenceProps) {
  const sequenceContext = [id];

  const safeDataset = dataset ?? getFallbackSceneDataList(dataUnit);

  const decimals = safeDataset.map((data) => data.value ?? 0);

  const longestSceneLength = Math.max(...decimals).toString(2).length;

  // const [transform, setTransform] = useState<React.CSSProperties['transform']>(
  //   view === 'perspective' ? `rotateX(40deg) translateY(-10%)` : undefined
  // );

  // useEffect(() => {
  //   const newValue =
  //     view === 'perspective' ? `rotateX(40deg) translateY(-10%)` : undefined;
  //   setTransform(newValue);
  // }, [view]);

  return (
    <section
      id={id}
      className="relative h-full w-full p-4 lg:p-6"
      style={{
        perspective: view === 'perspective' ? `2000px` : undefined,
      }}
    >
      <ul
        className={cn(
          'h-full gap-1 lg:gap-2',
          view === 'grid' ? 'grid' : undefined
        )}
        style={{
          transform:
            view === 'perspective'
              ? `rotateX(45deg) translateY(-10%)`
              : undefined,
          transformStyle: view === 'perspective' ? 'preserve-3d' : undefined,
          gridTemplateRows:
            view === 'grid'
              ? `repeat(${decimals.length}, minmax(3rem, 1fr))`
              : undefined,
          // transform: `rotateX(45deg) rotateZ(45deg) translateZ(-1em)`,
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
              length={
                view === 'grid'
                  ? longestSceneLength
                  : data.value?.toString(2).length
              }
              data={data}
              view={view ?? 'grid'}
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
