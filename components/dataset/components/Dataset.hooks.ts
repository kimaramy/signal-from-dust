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
import { SceneUtils } from '@/components/scene';
import { useSeasonKey } from '@/components/season';
import { useYearKey } from '@/components/year';

import { DatasetOrderUtils } from '../schema';

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

function useDatasetParams() {
  const locationKey = useLocationKey('query');
  const dustKey = useDustKey('query');
  const yearKey = useYearKey('query');
  const seasonKey = useSeasonKey('query');
  const monthKey = useMonthKey('query');
  return { locationKey, dustKey, yearKey, seasonKey, monthKey };
}

export { useSceneDataset, useDatasetParams, type InitialDataset };
