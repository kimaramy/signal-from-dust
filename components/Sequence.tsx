'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type {
  DailyData,
  MonthlyData,
  WeekDailyData,
  WeeklyData,
  YearlyData,
} from '@/domains';

import { Skeleton } from '@/components/ui/skeleton';
import { collectionSchema, type CollectionKey } from '@/components/collection';
import { dataNameSchema, type DataNameKey } from '@/components/dataName';
import { daySchema } from '@/components/day';
import { type DisplayKey } from '@/components/display';
import Grid from '@/components/Grid';
import { LocaleSchema } from '@/components/locale';
import { monthSchema } from '@/components/month';
import { type SceneData } from '@/components/Scene';
import { weekSchema } from '@/components/week';
import { weekdaySchema } from '@/components/weekday';
import { yearSchema } from '@/components/year';

const Scene = dynamic(
  () => import('@/components/Scene' /* webpackChunkName: "Scene" */),
  {
    loading: () => <Skeleton className="h-full w-full" />,
  }
);

interface SequenceProps {
  id: string;
  scenes: SceneData[];
  displayKey: DisplayKey;
}

function Sequence({ id, scenes, displayKey }: SequenceProps) {
  const ref = useRef<HTMLUListElement>(null);

  const values = scenes.map((scene) => scene.value ?? 0);

  useEffect(() => {
    window?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [scenes]);

  return (
    <Grid
      id={id}
      ref={ref}
      className="h-full"
      items={scenes}
      itemKey={(scene) => SceneUtils.getSceneId(id, scene.id)}
      renderItem={(scene, index) => (
        <Scene
          id={SceneUtils.getSceneId(id, scene.id)}
          data={scene}
          index={index}
          length={SceneUtils.getSceneLength(Math.max(...values))}
          displayKey={displayKey}
          onClick={() => {}}
        />
      )}
    />
  );
}

export class SceneUtils {
  static getSceneId(listId: string | number, itemId: string | number) {
    return [listId, itemId].join(',');
  }
  static getSceneLength(value: number) {
    return value.toString(2).length;
  }
  static toDailyScenes(
    dataset: DailyData[],
    dataNameKey: DataNameKey,
    collectionKey: CollectionKey,
    locale = LocaleSchema.defaultLocale
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
      collection: collectionSchema.display(collectionKey),
      dates: [
        monthSchema.display(monthSchema.getKeyByValue(month), 'short', locale),
        daySchema.display(daySchema.getKeyByValue(day), locale),
      ],
      location: LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toWeekDailyScenes(
    dataset: WeekDailyData[],
    dataNameKey: DataNameKey,
    collectionKey: CollectionKey,
    locale = LocaleSchema.defaultLocale
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
      collection: collectionSchema.display(collectionKey),
      dates: [
        monthSchema.display(monthSchema.getKeyByValue(month), 'short', locale),
        weekdaySchema.display(
          weekdaySchema.getKeyByValue(weekday),
          'long',
          locale
        ),
      ],
      location: LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toWeeklyScenes(
    dataset: WeeklyData[],
    dataNameKey: DataNameKey,
    collectionKey: CollectionKey,
    locale = LocaleSchema.defaultLocale
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
      collection: collectionSchema.display(collectionKey),
      dates: [
        yearSchema.display(yearSchema.getKeyByValue(year), 'short', locale),
        weekSchema.display(weekSchema.getKeyByValue(week), locale),
      ],
      location: LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toMonthlyScenes(
    dataset: MonthlyData[],
    dataNameKey: DataNameKey,
    collectionKey: CollectionKey,
    locale = LocaleSchema.defaultLocale
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
      collection: collectionSchema.display(collectionKey),
      dates: [
        yearSchema.display(yearSchema.getKeyByValue(year), 'short', locale),
        monthSchema.display(monthSchema.getKeyByValue(month), 'short', locale),
      ],
      location: LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toYearlyScenes(
    dataset: YearlyData[],
    dataNameKey: DataNameKey,
    collectionKey: CollectionKey,
    locale = LocaleSchema.defaultLocale
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
      collection: collectionSchema.display(collectionKey),
      dates: [
        yearSchema.display(yearSchema.getKeyByValue(year), 'short', locale),
      ],
      location: LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
}

export default Sequence;
