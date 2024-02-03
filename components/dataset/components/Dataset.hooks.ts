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
import { SceneUtils } from '@/components/scene';

interface InitialDataset {
  [CollectionUtils.schema.keys.YEARLY]?: Model.YearlyData[];
  [CollectionUtils.schema.keys.SEASONALLY]?: Model.MonthlyData[];
  [CollectionUtils.schema.keys.MONTHLY]?: Model.MonthlyData[];
  [CollectionUtils.schema.keys.WEEKLY]?: Model.WeeklyData[];
  [CollectionUtils.schema.keys.WEEKDAILY]?: Model.WeekDailyData[];
  [CollectionUtils.schema.keys.DAILY]?: Model.DailyData[];
}

interface UseSceneDatasetParams {
  initialDataset?: InitialDataset;
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

  return sceneDataset;
}

export { useSceneDataset, type InitialDataset };
