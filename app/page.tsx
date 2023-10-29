'use client';

import {
  useDailyDataListQuery,
  useMonthlyDataListQuery,
  useMonthlyDataListQueryBySeaon,
  useWeekDailyDataListQuery,
  useWeeklyDataListQuery,
  useYearlyDataListQuery,
} from '@/domains';

import { useCollectionValue } from '@/components/collection';
import { useDisplayValue } from '@/components/display';
import { useDustSizeValue } from '@/components/dustSize';
import FloatingButtons from '@/components/FloatingButtons';
import Minimap from '@/components/MiniMap';
import { useMonthValue } from '@/components/month';
import { useSeasonValue } from '@/components/season';
import Sequence, {
  toDailySceneDataList,
  toMonthlySceneDataList,
  toWeekDailySceneDataList,
  toWeeklySceneDataList,
  toYearlySceneDataList,
} from '@/components/Sequence';
import { SettingsDialog } from '@/components/settings';
import { useYearValue } from '@/components/year';

export default function IndexPage() {
  const display = useDisplayValue();

  const collection = useCollectionValue();

  const year = useYearValue();

  const season = useSeasonValue();

  const month = useMonthValue();

  const dataName = useDustSizeValue();

  const dailySceneDataList = useDailyDataListQuery(month, {
    enabled: collection === 'Daily',
    select: (dataset) => toDailySceneDataList(dataset, collection, dataName),
  });

  const weekDailySceneDataList = useWeekDailyDataListQuery(month, {
    enabled: collection === 'Weekdaily',
    select: (dataset) =>
      toWeekDailySceneDataList(dataset, collection, dataName),
  });

  const weeklySceneDataList = useWeeklyDataListQuery(year, {
    enabled: collection === 'Weekly',
    select: (dataset) => toWeeklySceneDataList(dataset, collection, dataName),
  });

  const monthlySceneDataList = useMonthlyDataListQuery(year, {
    enabled: collection === 'Monthly',
    select: (dataset) => toMonthlySceneDataList(dataset, collection, dataName),
  });

  const seasonalSceneDataList = useMonthlyDataListQueryBySeaon(year, season, {
    enabled: collection === 'Seasonally',
    select: (dataset) => toMonthlySceneDataList(dataset, collection, dataName),
  });

  const yearlySceneDataList = useYearlyDataListQuery({
    enabled: collection === 'Yearly',
    select: (dataset) => toYearlySceneDataList(dataset, collection, dataName),
  });

  const dataset = (function () {
    switch (collection) {
      case 'Yearly':
        return yearlySceneDataList;
      case 'Seasonally':
        return seasonalSceneDataList;
      case 'Monthly':
        return monthlySceneDataList;
      case 'Weekly':
        return weeklySceneDataList;
      case 'Weekdaily':
        return weekDailySceneDataList;
      case 'Daily':
      default:
        return dailySceneDataList;
    }
  })();

  return (
    <>
      <main className="relative flex flex-1 items-center overflow-y-auto scrollbar-hide 3xl:container 3xl:!px-0">
        <Minimap />
        <Sequence
          id="container"
          collection={collection}
          display={display}
          dataset={dataset}
        />
      </main>
      <FloatingButtons />
      <SettingsDialog />
    </>
  );
}
