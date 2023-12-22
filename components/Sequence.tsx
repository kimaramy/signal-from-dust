'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

import * as Model from '@/lib/model';
import { Skeleton } from '@/components/ui/skeleton';
import { type DisplayKey } from '@/components/display';
import Grid from '@/components/Grid';
import { type SceneData } from '@/components/Scene';

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
    dataset: Model.DailyData[],
    dataNameKey: Model.DataNameKey,
    collectionKey: Model.CollectionKey,
    locale = Model.LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, month, day, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: Model.dataNameSchema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: Model.collectionSchema.display(collectionKey),
      dates: [
        Model.daySchema.display(Model.daySchema.getKeyByValue(day), locale),
        Model.monthSchema.display(
          Model.monthSchema.getKeyByValue(month),
          'short',
          locale
        ),
      ],
      location: Model.LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toWeekDailyScenes(
    dataset: Model.WeekDailyData[],
    dataNameKey: Model.DataNameKey,
    collectionKey: Model.CollectionKey,
    locale = Model.LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, month, weekday, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: Model.dataNameSchema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: Model.collectionSchema.display(collectionKey),
      dates: [
        Model.weekdaySchema.display(
          Model.weekdaySchema.getKeyByValue(weekday),
          'long',
          locale
        ),
        Model.monthSchema.display(
          Model.monthSchema.getKeyByValue(month),
          'short',
          locale
        ),
      ],
      location: Model.LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toWeeklyScenes(
    dataset: Model.WeeklyData[],
    dataNameKey: Model.DataNameKey,
    collectionKey: Model.CollectionKey,
    locale = Model.LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, week, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: Model.dataNameSchema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: Model.collectionSchema.display(collectionKey),
      dates: [
        Model.weekSchema.display(Model.weekSchema.getKeyByValue(week), locale),
        Model.yearSchema.display(
          Model.yearSchema.getKeyByValue(year),
          'short',
          locale
        ),
      ],
      location: Model.LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toMonthlyScenes(
    dataset: Model.MonthlyData[],
    dataNameKey: Model.DataNameKey,
    collectionKey: Model.CollectionKey,
    locale = Model.LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, month, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: Model.dataNameSchema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: Model.collectionSchema.display(collectionKey),
      dates: [
        Model.monthSchema.display(
          Model.monthSchema.getKeyByValue(month),
          'long',
          locale
        ),
        Model.yearSchema.display(
          Model.yearSchema.getKeyByValue(year),
          'short',
          locale
        ),
      ],
      location: Model.LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toYearlyScenes(
    dataset: Model.YearlyData[],
    dataNameKey: Model.DataNameKey,
    collectionKey: Model.CollectionKey,
    locale = Model.LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: Model.dataNameSchema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: Model.collectionSchema.display(collectionKey),
      dates: [
        Model.yearSchema.display(
          Model.yearSchema.getKeyByValue(year),
          'short',
          locale
        ),
      ],
      location: Model.LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
}

export default Sequence;
