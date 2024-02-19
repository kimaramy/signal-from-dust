import * as Domains from '@/domains';

import {
  CollectionUtils,
  DustUtils,
  LocationUtils,
  Model,
  MonthUtils,
  SeasonUtils,
  YearUtils,
  type Locale,
} from '@/lib/model';
import { useDustKey } from '@/components/dust';
import { useLocationKey } from '@/components/location';
import { useMonthKey } from '@/components/month';
import { SceneData, SceneUtils } from '@/components/scene/lib';
import { useSeasonKey } from '@/components/season';
import { useYearKey } from '@/components/year';
import { IntlMessageFormat, useLocaleDictionary } from '@/lib/i18n';

import { DatasetOrderUtils } from '../lib';
import { useCallback } from 'react';

interface InitialDataset {
  [CollectionUtils.schema.keys.YEARLY]?: Model.YearlyData[];
  [CollectionUtils.schema.keys.SEASONALLY]?: Model.SeasonalData;
  [CollectionUtils.schema.keys.MONTHLY]?: Model.MonthlyData[];
  [CollectionUtils.schema.keys.WEEKLY]?: Model.WeeklyData[];
  [CollectionUtils.schema.keys.WEEKDAILY]?: Model.WeekDailyData[];
  [CollectionUtils.schema.keys.DAILY]?: Model.DailyData[];
}

interface UseSceneDatasetParams {
  initialDataset?: InitialDataset;
  datasetOrderKey: DatasetOrderUtils.Key;
  initialCollectionKey: CollectionUtils.Key;
  locationKey: LocationUtils.Key;
  dustKey: DustUtils.Key;
  yearKey: YearUtils.Key;
  monthKey: MonthUtils.Key;
  seasonKey: SeasonUtils.Key;
  locale: Locale;
}

function useSceneDataset(params: UseSceneDatasetParams) {
  const {
    initialDataset,
    datasetOrderKey,
    initialCollectionKey,
    locationKey,
    dustKey,
    yearKey,
    monthKey,
    seasonKey,
    locale,
  } = params;

  const yearlySceneDataset = Domains.useYearlyListQuery({
    initialData: initialDataset?.['YEARLY'],
    enabled: initialCollectionKey === 'YEARLY',
    select: (dataset) =>
      SceneUtils.toYearlySceneDataset(
        dataset,
        initialCollectionKey,
        locationKey,
        dustKey,
        locale
      ),
  });

  const seasonalSceneDataset = Domains.useMonthlyListQueryBySeason(
    yearKey,
    seasonKey,
    {
      initialData: initialDataset?.['SEASONALLY'],
      enabled: initialCollectionKey === 'SEASONALLY',
      select: (data) =>
        SceneUtils.toSeasonalSceneDataset(
          data,
          seasonKey,
          initialCollectionKey,
          locationKey,
          dustKey,
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
        initialCollectionKey,
        locationKey,
        dustKey,
        locale
      ),
  });

  const weeklySceneDataset = Domains.useWeeklyListQuery(yearKey, {
    initialData: initialDataset?.['WEEKLY'],
    enabled: initialCollectionKey === 'WEEKLY',
    select: (dataset) =>
      SceneUtils.toWeeklySceneDataset(
        dataset,
        initialCollectionKey,
        locationKey,
        dustKey,
        locale
      ),
  });

  const weekdailySceneDataset = Domains.useWeekDailyListQuery(monthKey, {
    initialData: initialDataset?.['WEEKDAILY'],
    enabled: initialCollectionKey === 'WEEKDAILY',
    select: (dataset) =>
      SceneUtils.toWeekDailySceneDataset(
        dataset,
        initialCollectionKey,
        locationKey,
        dustKey,
        locale
      ),
  });

  const dailySceneDataset = Domains.useDailyListQuery(monthKey, {
    initialData: initialDataset?.['DAILY'],
    enabled: initialCollectionKey === 'DAILY',
    select: (dataset) =>
      SceneUtils.toDailySceneDataset(
        dataset,
        initialCollectionKey,
        locationKey,
        dustKey,
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

  if (datasetOrderKey === 'GRADE') {
    return sceneDataset
      ?.sort((a, b) => (b.value ?? 0) - (a.value ?? 0))
      .map((sceneData, idx) => ({ ...sceneData, rank: idx + 1 }));
  }

  return sceneDataset;
}

function useSceneContents() {
  const { dictionary } = useLocaleDictionary();

  const createSceneTitle = useCallback(
    (sceneData: SceneData) => {
      const { dust, dates } = sceneData.display;
      const title =
        sceneData._ctx.collectionKey === 'YEARLY'
          ? new IntlMessageFormat(dictionary.dataset.year_title).format({
              dust,
              year: dates[0],
            })
          : new IntlMessageFormat(dictionary.dataset.title).format({
              dust,
              primaryDate: dates[0],
              secondaryDate: dates[1],
            });
      return title as string;
    },
    [dictionary]
  );

  const createSceneSubtitle = useCallback(
    (sceneData: SceneData) => {
      const { collection, dust, yearRange, location } = sceneData.display;
      const title = [
        dictionary.dataset.label,
        new IntlMessageFormat(dictionary.dataset.source).format({
          collection,
          dust,
          yearRange,
          location,
        }),
      ].join(' : ');
      return title;
    },
    [dictionary]
  );

  const createSceneDescription = useCallback(() => {
    return dictionary.dataset.description
  }, [dictionary])

  return { createSceneTitle, createSceneSubtitle, createSceneDescription }
}

function useDatasetParams() {
  const locationKey = useLocationKey('query');
  const dustKey = useDustKey('query');
  const yearKey = useYearKey('query');
  const seasonKey = useSeasonKey('query');
  const monthKey = useMonthKey('query');
  return { locationKey, dustKey, yearKey, seasonKey, monthKey };
}

export { useSceneDataset, useSceneContents, useDatasetParams, type InitialDataset };
