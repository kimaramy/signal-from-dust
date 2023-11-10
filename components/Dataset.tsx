'use client';

import React from 'react';
import {
  useDailyListQuery,
  useMonthlyListQuery,
  useMonthlyListQueryBySeason,
  useWeekDailyListQuery,
  useWeeklyListQuery,
  useYearlyListQuery,
} from '@/domains';

import { useDataCollectionKey } from '@/components/dataCollection';
import { useDataNameKey } from '@/components/dataName';
import { useDisplayKey } from '@/components/display';
import { useMonthKey } from '@/components/month';
import { useSeasonKey } from '@/components/season';
import Sequence, {
  toDailySceneDataset,
  toMonthlySceneDataset,
  toWeekDailySceneDataset,
  toWeeklySceneDataset,
  toYearlySceneDataset,
} from '@/components/Sequence';
import { useYearKey } from '@/components/year';

function Dataset() {
  const displayKey = useDisplayKey();

  const dataNameKey = useDataNameKey();

  const dataCollectionKey = useDataCollectionKey();

  const yearKey = useYearKey();

  const seasonKey = useSeasonKey();

  const monthKey = useMonthKey();

  const dailySceneDataset = useDailyListQuery(monthKey, {
    enabled: dataCollectionKey === 'DAILY',
    select: (dataset) =>
      toDailySceneDataset(dataset, dataNameKey, dataCollectionKey),
  });

  const weekDailySceneDataset = useWeekDailyListQuery(monthKey, {
    enabled: dataCollectionKey === 'WEEKDAILY',
    select: (dataset) =>
      toWeekDailySceneDataset(dataset, dataNameKey, dataCollectionKey),
  });

  const weeklySceneDataset = useWeeklyListQuery(yearKey, {
    enabled: dataCollectionKey === 'WEEKLY',
    select: (dataset) =>
      toWeeklySceneDataset(dataset, dataNameKey, dataCollectionKey),
  });

  const monthlySceneDataset = useMonthlyListQuery(yearKey, {
    enabled: dataCollectionKey === 'MONTHLY',
    select: (dataset) =>
      toMonthlySceneDataset(dataset, dataNameKey, dataCollectionKey),
  });

  const seasonalSceneDataset = useMonthlyListQueryBySeason(yearKey, seasonKey, {
    enabled: dataCollectionKey === 'SEASONALLY',
    select: (dataset) =>
      toMonthlySceneDataset(dataset, dataNameKey, dataCollectionKey),
  });

  const yearlySceneDataset = useYearlyListQuery({
    enabled: dataCollectionKey === 'YEARLY',
    select: (dataset) =>
      toYearlySceneDataset(dataset, dataNameKey, dataCollectionKey),
  });

  const dataset = (function () {
    switch (dataCollectionKey) {
      case 'YEARLY':
        return yearlySceneDataset;
      case 'SEASONALLY':
        return seasonalSceneDataset;
      case 'MONTHLY':
        return monthlySceneDataset;
      case 'WEEKLY':
        return weeklySceneDataset;
      case 'WEEKDAILY':
        return weekDailySceneDataset;
      case 'DAILY':
      default:
        return dailySceneDataset;
    }
  })();

  return (
    <Sequence
      id="container"
      dataCollectionKey={dataCollectionKey}
      displayKey={displayKey}
      dataset={dataset}
    />
  );
}

export default Dataset;
