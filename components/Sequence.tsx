'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

import {
  AppCollection,
  AppData,
  AppDataName,
  AppDay,
  AppMonth,
  AppSchema,
  AppWeek,
  AppWeekday,
  AppYear,
} from '@/lib/model';
import { Skeleton } from '@/components/ui/skeleton';
import { type DisplayKey } from '@/components/display';
import Grid from '@/components/Grid';
import { type SceneData } from '@/components/Scene';

const Scene = dynamic(() => import('@/components/Scene'), {
  loading: () => <Skeleton className="h-full w-full" />,
});

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
    dataset: AppData.DailyData[],
    dataNameKey: AppDataName.Key,
    collectionKey: AppCollection.Key,
    locale = AppSchema.get('locale').defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, month, day, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: AppDataName.schema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: AppCollection.schema.display(collectionKey),
      dates: [
        AppDay.schema.display(AppDay.schema.getKeyByValue(day), locale),
        AppMonth.schema.display(
          AppMonth.schema.getKeyByValue(month),
          'short',
          locale
        ),
      ],
      location: AppSchema.get('locale').isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toWeekDailyScenes(
    dataset: AppData.WeekDailyData[],
    dataNameKey: AppDataName.Key,
    collectionKey: AppCollection.Key,
    locale = AppSchema.get('locale').defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, month, weekday, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: AppDataName.schema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: AppCollection.schema.display(collectionKey),
      dates: [
        AppWeekday.schema.display(
          AppWeekday.schema.getKeyByValue(weekday),
          'long',
          locale
        ),
        AppMonth.schema.display(
          AppMonth.schema.getKeyByValue(month),
          'short',
          locale
        ),
      ],
      location: AppSchema.get('locale').isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toWeeklyScenes(
    dataset: AppData.WeeklyData[],
    dataNameKey: AppDataName.Key,
    collectionKey: AppCollection.Key,
    locale = AppSchema.get('locale').defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, week, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: AppDataName.schema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: AppCollection.schema.display(collectionKey),
      dates: [
        AppWeek.schema.display(AppWeek.schema.getKeyByValue(week), locale),
        AppYear.schema.display(
          AppYear.schema.getKeyByValue(year),
          'short',
          locale
        ),
      ],
      location: AppSchema.get('locale').isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toMonthlyScenes(
    dataset: AppData.MonthlyData[],
    dataNameKey: AppDataName.Key,
    collectionKey: AppCollection.Key,
    locale = AppSchema.get('locale').defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, month, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: AppDataName.schema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: AppCollection.schema.display(collectionKey),
      dates: [
        AppMonth.schema.display(
          AppMonth.schema.getKeyByValue(month),
          'long',
          locale
        ),
        AppYear.schema.display(
          AppYear.schema.getKeyByValue(year),
          'short',
          locale
        ),
      ],
      location: AppSchema.get('locale').isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toYearlyScenes(
    dataset: AppData.YearlyData[],
    dataNameKey: AppDataName.Key,
    collectionKey: AppCollection.Key,
    locale = AppSchema.get('locale').defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: AppDataName.schema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: AppCollection.schema.display(collectionKey),
      dates: [
        AppYear.schema.display(
          AppYear.schema.getKeyByValue(year),
          'short',
          locale
        ),
      ],
      location: AppSchema.get('locale').isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
}

export default Sequence;
