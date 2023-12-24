'use client';

import * as Domains from '@/domains';

import { useLocaleDictionary } from '@/lib/i18n';
import { CollectionUtils, Model } from '@/lib/model';
import { useDataNameKey } from '@/components/dataName';
import { useDisplayKey } from '@/components/display';
import { useMonthKey } from '@/components/month';
import { useSeasonKey } from '@/components/season';
import Sequence, { SceneUtils } from '@/components/Sequence';
import { useYearKey } from '@/components/year';

interface DatasetProps {
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

function Dataset({ initialCollectionKey, initialDataset }: DatasetProps) {
  const { locale } = useLocaleDictionary();

  const displayKey = useDisplayKey('query');

  const dataNameKey = useDataNameKey('query');

  const yearKey = useYearKey('query');

  const seasonKey = useSeasonKey('query');

  const monthKey = useMonthKey('query');

  const yearlyScenes = Domains.useYearlyListQuery({
    initialData: initialDataset?.['YEARLY'],
    enabled: initialCollectionKey === 'YEARLY',
    select: (dataset) =>
      SceneUtils.toYearlyScenes(
        dataset,
        dataNameKey,
        initialCollectionKey,
        locale
      ),
  });

  const seasonalScenes = Domains.useMonthlyListQueryBySeason(
    yearKey,
    seasonKey,
    {
      initialData: initialDataset?.['SEASONALLY'],
      enabled: initialCollectionKey === 'SEASONALLY',
      select: (dataset) =>
        SceneUtils.toMonthlyScenes(
          dataset,
          dataNameKey,
          initialCollectionKey,
          locale
        ),
    }
  );

  const monthlyScenes = Domains.useMonthlyListQuery(yearKey, {
    initialData: initialDataset?.['MONTHLY'],
    enabled: initialCollectionKey === 'MONTHLY',
    select: (dataset) =>
      SceneUtils.toMonthlyScenes(
        dataset,
        dataNameKey,
        initialCollectionKey,
        locale
      ),
  });

  const weeklyScenes = Domains.useWeeklyListQuery(yearKey, {
    initialData: initialDataset?.['WEEKLY'],
    enabled: initialCollectionKey === 'WEEKLY',
    select: (dataset) =>
      SceneUtils.toWeeklyScenes(
        dataset,
        dataNameKey,
        initialCollectionKey,
        locale
      ),
  });

  const weekdailyScenes = Domains.useWeekDailyListQuery(monthKey, {
    initialData: initialDataset?.['WEEKDAILY'],
    enabled: initialCollectionKey === 'WEEKDAILY',
    select: (dataset) =>
      SceneUtils.toWeekDailyScenes(
        dataset,
        dataNameKey,
        initialCollectionKey,
        locale
      ),
  });

  const dailyScenes = Domains.useDailyListQuery(monthKey, {
    initialData: initialDataset?.['DAILY'],
    enabled: initialCollectionKey === 'DAILY',
    select: (dataset) =>
      SceneUtils.toDailyScenes(
        dataset,
        dataNameKey,
        initialCollectionKey,
        locale
      ),
  });

  const scenes = (function () {
    switch (initialCollectionKey) {
      case 'YEARLY':
        return yearlyScenes;
      case 'SEASONALLY':
        return seasonalScenes;
      case 'MONTHLY':
        return monthlyScenes;
      case 'WEEKLY':
        return weeklyScenes;
      case 'WEEKDAILY':
        return weekdailyScenes;
      case 'DAILY':
      default:
        return dailyScenes;
    }
  })();

  const sequenceId = [
    initialCollectionKey,
    dataNameKey,
    yearKey,
    seasonKey,
    monthKey,
  ].join(',');

  if (!scenes) return null;

  return <Sequence id={sequenceId} scenes={scenes} displayKey={displayKey} />;
}

export default Dataset;
