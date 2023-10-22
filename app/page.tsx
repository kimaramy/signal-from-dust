'use client';

import {
  DataUnit,
  useDailyDataListQuery,
  useMonthlyDataListQuery,
  useWeekDailyDataListQuery,
  useWeeklyDataListQuery,
  useYearlyDataListQuery,
} from '@/domains';
import { useNumberQueryParam, useQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';
import { useDisplayValue } from '@/components/display';
import Sequence, {
  toDailySceneDataList,
  toMonthlySceneDataList,
  toWeekDailySceneDataList,
  toWeeklySceneDataList,
  toYearlySceneDataList,
} from '@/components/Sequence';

export default function IndexPage() {
  const display = useDisplayValue();

  const [dataUnit] = useQueryParam<DataUnit>(QueryParamEnum.DataUnit, 'daily');

  const [year] = useNumberQueryParam(QueryParamEnum.Year, '0');

  const [month] = useNumberQueryParam(QueryParamEnum.Month, '0');

  const dailySceneDataList = useDailyDataListQuery(Number(month), {
    enabled: dataUnit === 'daily',
    select: toDailySceneDataList,
  });

  const weekDailySceneDataList = useWeekDailyDataListQuery(Number(month), {
    enabled: dataUnit === 'weekdaily',
    select: toWeekDailySceneDataList,
  });

  const weeklySceneDataList = useWeeklyDataListQuery(Number(year), {
    enabled: dataUnit === 'weekly',
    select: toWeeklySceneDataList,
  });

  const monthlySceneDataList = useMonthlyDataListQuery(Number(year), {
    enabled: dataUnit === 'monthly',
    select: toMonthlySceneDataList,
  });

  const yearlySceneDataList = useYearlyDataListQuery({
    enabled: dataUnit === 'yearly',
    select: toYearlySceneDataList,
  });

  const dataset = (function () {
    switch (dataUnit) {
      case 'yearly':
        return yearlySceneDataList;
      case 'monthly':
        return monthlySceneDataList;
      case 'weekly':
        return weeklySceneDataList;
      case 'weekdaily':
        return weekDailySceneDataList;
      case 'daily':
      default:
        return dailySceneDataList;
    }
  })();

  return (
    <>
      <main className="relative h-screen overflow-y-auto">
        <Sequence
          id="first"
          display={display}
          dataset={dataset}
          dataUnit={dataUnit}
        />
      </main>
    </>
  );
}
