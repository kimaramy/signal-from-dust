'use client';

import React from 'react';
import * as Domains from '@/domains';

import { useLocaleDictionary } from '@/lib/i18n';
import { CollectionUtils, Model } from '@/lib/model';
import { toLowerCase } from '@/lib/utils';
import { useDustKey } from '@/components/dust';
import { LayoutConsumer } from '@/components/layout';
import { useLocationKey } from '@/components/location';
import { useMonthKey } from '@/components/month';
import { SceneUtils } from '@/components/scene';
import { useSeasonKey } from '@/components/season';
import { Sequence, Sequence2 } from '@/components/sequence';
import { useYearKey } from '@/components/year';

export interface DatasetBodyProps {
  initialCollectionKey: CollectionUtils.Key;
  initialDataset?: {
    [CollectionUtils.schema.keys.YEARLY]?: Model.YearlyData[];
    [CollectionUtils.schema.keys.SEASONALLY]?: Model.MonthlyData[];
    [CollectionUtils.schema.keys.MONTHLY]?: Model.MonthlyData[];
    [CollectionUtils.schema.keys.WEEKLY]?: Model.WeeklyData[];
    [CollectionUtils.schema.keys.WEEKDAILY]?: Model.WeekDailyData[];
    [CollectionUtils.schema.keys.DAILY]?: Model.DailyData[];
  };
}

const DatasetBody = React.forwardRef<HTMLDivElement, DatasetBodyProps>(
  function DatasetBody({ initialCollectionKey, initialDataset }, ref) {
    const { locale } = useLocaleDictionary();

    const locationKey = useLocationKey('query');

    const dustKey = useDustKey('query');

    const yearKey = useYearKey('query');

    const seasonKey = useSeasonKey('query');

    const monthKey = useMonthKey('query');

    const yearlySceneDataset = Domains.useYearlyListQuery({
      initialData: initialDataset?.['YEARLY'],
      enabled: initialCollectionKey === 'YEARLY',
      select: (dataset) =>
        SceneUtils.toYearlySceneDataset(
          dataset,
          dustKey,
          initialCollectionKey,
          locationKey,
          locale
        ),
    });

    const seasonalSceneDataset = Domains.useMonthlyListQueryBySeason(
      yearKey,
      seasonKey,
      {
        initialData: initialDataset?.['SEASONALLY'],
        enabled: initialCollectionKey === 'SEASONALLY',
        select: (dataset) =>
          SceneUtils.toMonthlySceneDataset(
            dataset,
            dustKey,
            initialCollectionKey,
            locationKey,
            locale
          ),
      }
    );

    const monthlySceneDataset = Domains.useMonthlyListQuery(yearKey, {
      initialData: initialDataset?.['MONTHLY'],
      enabled: initialCollectionKey === 'MONTHLY',
      select: (dataset) =>
        SceneUtils.toMonthlySceneDataset(
          dataset,
          dustKey,
          initialCollectionKey,
          locationKey,
          locale
        ),
    });

    const weeklySceneDataset = Domains.useWeeklyListQuery(yearKey, {
      initialData: initialDataset?.['WEEKLY'],
      enabled: initialCollectionKey === 'WEEKLY',
      select: (dataset) =>
        SceneUtils.toWeeklySceneDataset(
          dataset,
          dustKey,
          initialCollectionKey,
          locationKey,
          locale
        ),
    });

    const weekdailySceneDataset = Domains.useWeekDailyListQuery(monthKey, {
      initialData: initialDataset?.['WEEKDAILY'],
      enabled: initialCollectionKey === 'WEEKDAILY',
      select: (dataset) =>
        SceneUtils.toWeekDailySceneDataset(
          dataset,
          dustKey,
          initialCollectionKey,
          locationKey,
          locale
        ),
    });

    const dailySceneDataset = Domains.useDailyListQuery(monthKey, {
      initialData: initialDataset?.['DAILY'],
      enabled: initialCollectionKey === 'DAILY',
      select: (dataset) =>
        SceneUtils.toDailySceneDataset(
          dataset,
          dustKey,
          initialCollectionKey,
          locationKey,
          locale
        ),
    });

    const sceneDataset = (function () {
      switch (initialCollectionKey) {
        case 'YEARLY':
          return yearlySceneDataset;
        case 'SEASONALLY':
          return seasonalSceneDataset;
        case 'MONTHLY':
          return monthlySceneDataset;
        case 'WEEKLY':
          return weeklySceneDataset;
        case 'WEEKDAILY':
          return weekdailySceneDataset;
        case 'DAILY':
        default:
          return dailySceneDataset;
      }
    })();

    const sceneDatasetId = [
      initialCollectionKey,
      dustKey,
      yearKey,
      monthKey,
      seasonKey,
    ]
      .map((key) => toLowerCase(key))
      .join('-');

    if (!sceneDataset) return null;

    return (
      <LayoutConsumer>
        {(layoutContext) => {
          switch (layoutContext.key) {
            case 'GRID':
              return (
                <Sequence2
                  ref={ref}
                  id={sceneDatasetId}
                  sceneDataset={sceneDataset}
                />
              );
            case 'LIST':
            default:
              return (
                <Sequence
                  ref={ref}
                  id={sceneDatasetId}
                  sceneDataset={sceneDataset}
                />
              );
          }
        }}
      </LayoutConsumer>
    );
  }
);

export default DatasetBody;
