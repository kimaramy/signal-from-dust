'use client';

import {
  useDailyDataListQuery,
  useMonthlyListQuery,
  useMonthlyListQueryBySeaon,
  useWeekDailyDataListQuery,
  useWeeklyDataListQuery,
  useYearlyDataListQuery,
} from '@/domains';

import { useDataCollectionKey } from '@/components/dataCollection';
import { useDataNameKey } from '@/components/dataName';
import { useDisplayKey } from '@/components/display';
import FloatingButtons from '@/components/FloatingButtons';
import Minimap from '@/components/MiniMap';
import { useMonthValue } from '@/components/month';
import { useSeasonValue } from '@/components/season';
import Sequence, {
  toDailySceneDataset,
  toMonthlySceneDataset,
  toWeekDailySceneDataset,
  toWeeklySceneDataset,
  toYearlySceneDataset,
} from '@/components/Sequence';
import { SettingsDialog } from '@/components/settings';
import { useYearValue } from '@/components/year';

export default function IndexPage() {
  const displayKey = useDisplayKey();

  const dataNameKey = useDataNameKey();

  const dataCollectionKey = useDataCollectionKey();

  const yearValue = useYearValue();

  const seasonValue = useSeasonValue();

  const monthValue = useMonthValue();

  const dailySceneDataset = useDailyDataListQuery(monthValue, {
    enabled: dataCollectionKey === 'DAILY',
    select: (dataset) =>
      toDailySceneDataset(dataset, dataNameKey, dataCollectionKey),
  });

  const weekDailySceneDataset = useWeekDailyDataListQuery(monthValue, {
    enabled: dataCollectionKey === 'WEEKDAILY',
    select: (dataset) =>
      toWeekDailySceneDataset(dataset, dataNameKey, dataCollectionKey),
  });

  const weeklySceneDataset = useWeeklyDataListQuery(yearValue, {
    enabled: dataCollectionKey === 'WEEKLY',
    select: (dataset) =>
      toWeeklySceneDataset(dataset, dataNameKey, dataCollectionKey),
  });

  const monthlySceneDataset = useMonthlyListQuery(yearValue, {
    enabled: dataCollectionKey === 'MONTHLY',
    select: (dataset) =>
      toMonthlySceneDataset(dataset, dataNameKey, dataCollectionKey),
  });

  const seasonalSceneDataset = useMonthlyListQueryBySeaon(
    yearValue,
    seasonValue,
    {
      enabled: dataCollectionKey === 'SEASONALLY',
      select: (dataset) =>
        toMonthlySceneDataset(dataset, dataNameKey, dataCollectionKey),
    }
  );

  const yearlySceneDataset = useYearlyDataListQuery({
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
    <>
      <main className="relative flex flex-1 items-center overflow-y-auto scrollbar-hide 3xl:container 3xl:!px-0">
        <Minimap />
        <Sequence
          id="container"
          dataCollectionKey={dataCollectionKey}
          displayKey={displayKey}
          dataset={dataset}
        />
      </main>
      <FloatingButtons />
      <SettingsDialog />
    </>
  );
}
