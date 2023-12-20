'use client';

import * as Domains from '@/domains';

import * as Model from '@/lib/model';
import { useDataNameKey } from '@/components/dataName';
import { useDisplayKey } from '@/components/display';
import { useMonthKey } from '@/components/month';
import { useSeasonKey } from '@/components/season';
import Sequence, { SceneUtils } from '@/components/Sequence';
import { useYearKey } from '@/components/year';

interface DatasetProps {
  initialCollectionKey: Model.CollectionKey;
  initialDataset?: {
    [Model.collectionSchema.keys.YEARLY]?: Model.YearlyData[];
    [Model.collectionSchema.keys.SEASONALLY]?: Model.MonthlyData[];
    [Model.collectionSchema.keys.MONTHLY]?: Model.MonthlyData[];
    [Model.collectionSchema.keys.WEEKLY]?: Model.WeeklyData[];
    [Model.collectionSchema.keys.WEEKDAILY]?: Model.WeekDailyData[];
    [Model.collectionSchema.keys.DAILY]?: Model.DailyData[];
  };
}

function Dataset({ initialCollectionKey, initialDataset }: DatasetProps) {
  const displayKey = useDisplayKey();

  const dataNameKey = useDataNameKey();

  const yearKey = useYearKey();

  const seasonKey = useSeasonKey();

  const monthKey = useMonthKey();

  const yearlyScenes = Domains.useYearlyListQuery({
    initialData: initialDataset?.['YEARLY'],
    enabled: initialCollectionKey === 'YEARLY',
    select: (dataset) =>
      SceneUtils.toYearlyScenes(dataset, dataNameKey, initialCollectionKey),
  });

  const seasonalScenes = Domains.useMonthlyListQueryBySeason(
    yearKey,
    seasonKey,
    {
      initialData: initialDataset?.['SEASONALLY'],
      enabled: initialCollectionKey === 'SEASONALLY',
      select: (dataset) =>
        SceneUtils.toMonthlyScenes(dataset, dataNameKey, initialCollectionKey),
    }
  );

  const monthlyScenes = Domains.useMonthlyListQuery(yearKey, {
    initialData: initialDataset?.['MONTHLY'],
    enabled: initialCollectionKey === 'MONTHLY',
    select: (dataset) =>
      SceneUtils.toMonthlyScenes(dataset, dataNameKey, initialCollectionKey),
  });

  const weeklyScenes = Domains.useWeeklyListQuery(yearKey, {
    initialData: initialDataset?.['WEEKLY'],
    enabled: initialCollectionKey === 'WEEKLY',
    select: (dataset) =>
      SceneUtils.toWeeklyScenes(dataset, dataNameKey, initialCollectionKey),
  });

  const weekdailyScenes = Domains.useWeekDailyListQuery(monthKey, {
    initialData: initialDataset?.['WEEKDAILY'],
    enabled: initialCollectionKey === 'WEEKDAILY',
    select: (dataset) =>
      SceneUtils.toWeekDailyScenes(dataset, dataNameKey, initialCollectionKey),
  });

  const dailyScenes = Domains.useDailyListQuery(monthKey, {
    initialData: initialDataset?.['DAILY'],
    enabled: initialCollectionKey === 'DAILY',
    select: (dataset) =>
      SceneUtils.toDailyScenes(dataset, dataNameKey, initialCollectionKey),
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
