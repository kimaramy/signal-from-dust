'use client';

import * as Domains from '@/domains';

import {
  dataCollectionSchema,
  useDataCollectionKey,
} from '@/components/dataCollection';
import { useDataNameKey } from '@/components/dataName';
import { useDisplayKey } from '@/components/display';
import { useMonthKey } from '@/components/month';
import { useSeasonKey } from '@/components/season';
import Sequence, { SceneUtils } from '@/components/Sequence';
import { useYearKey } from '@/components/year';

import FakeDataset from './FakeDataset';

interface DatasetProps {
  initialDataset: {
    [dataCollectionSchema.keys.YEARLY]?: Domains.YearlyData[];
    [dataCollectionSchema.keys.SEASONALLY]?: Domains.MonthlyData[];
    [dataCollectionSchema.keys.MONTHLY]?: Domains.MonthlyData[];
    [dataCollectionSchema.keys.WEEKLY]?: Domains.WeeklyData[];
    [dataCollectionSchema.keys.WEEKDAILY]?: Domains.WeekDailyData[];
    [dataCollectionSchema.keys.DAILY]?: Domains.DailyData[];
  };
}

function Dataset({ initialDataset }: DatasetProps) {
  const displayKey = useDisplayKey();

  const dataNameKey = useDataNameKey();

  const dataCollectionKey = useDataCollectionKey();

  const yearKey = useYearKey();

  const seasonKey = useSeasonKey();

  const monthKey = useMonthKey();

  const yearlyScenes = Domains.useYearlyListQuery({
    initialData: initialDataset['YEARLY'],
    enabled: dataCollectionKey === 'YEARLY',
    select: (dataset) =>
      SceneUtils.toYearlyScenes(dataset, dataNameKey, dataCollectionKey),
  });

  const seasonalScenes = Domains.useMonthlyListQueryBySeason(
    yearKey,
    seasonKey,
    {
      initialData: initialDataset['SEASONALLY'],
      enabled: dataCollectionKey === 'SEASONALLY',
      select: (dataset) =>
        SceneUtils.toMonthlyScenes(dataset, dataNameKey, dataCollectionKey),
    }
  );

  const monthlyScenes = Domains.useMonthlyListQuery(yearKey, {
    initialData: initialDataset['MONTHLY'],
    enabled: dataCollectionKey === 'MONTHLY',
    select: (dataset) =>
      SceneUtils.toMonthlyScenes(dataset, dataNameKey, dataCollectionKey),
  });

  const weeklyScenes = Domains.useWeeklyListQuery(yearKey, {
    initialData: initialDataset['WEEKLY'],
    enabled: dataCollectionKey === 'WEEKLY',
    select: (dataset) =>
      SceneUtils.toWeeklyScenes(dataset, dataNameKey, dataCollectionKey),
  });

  const weekdailyScenes = Domains.useWeekDailyListQuery(monthKey, {
    initialData: initialDataset['WEEKDAILY'],
    enabled: dataCollectionKey === 'WEEKDAILY',
    select: (dataset) =>
      SceneUtils.toWeekDailyScenes(dataset, dataNameKey, dataCollectionKey),
  });

  const dailyScenes = Domains.useDailyListQuery(monthKey, {
    initialData: initialDataset['DAILY'],
    enabled: dataCollectionKey === 'DAILY',
    select: (dataset) =>
      SceneUtils.toDailyScenes(dataset, dataNameKey, dataCollectionKey),
  });

  const scenes = (function () {
    switch (dataCollectionKey) {
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
    dataCollectionKey,
    dataNameKey,
    yearKey,
    seasonKey,
    monthKey,
  ].join(',');

  if (!scenes) return <FakeDataset />;

  return <Sequence id={sequenceId} scenes={scenes} displayKey={displayKey} />;
}

export default Dataset;
