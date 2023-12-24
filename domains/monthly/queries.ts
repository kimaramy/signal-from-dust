import { Model, SeasonUtils, YearUtils } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { monthlyQueryKeys, type MonthlyQueryKeys } from './queryKeys';

export function useMonthlyListQuery<T = Model.MonthlyData[]>(
  yearKey: YearUtils.Key,
  options?: UseSbSQOptions<
    Model.MonthlyData[],
    T,
    MonthlyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSbSQ({
    ...monthlyQueryKeys.list(yearKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useMonthlyListQueryBySeason<T = Model.MonthlyData[]>(
  yearKey: YearUtils.Key,
  seasonKey: SeasonUtils.Key,
  options?: UseSbSQOptions<
    Model.MonthlyData[],
    T,
    MonthlyQueryKeys['list']['_ctx']['seasonally']['queryKey']
  >
) {
  const { data } = useSbSQ({
    ...monthlyQueryKeys.list(yearKey)._ctx.seasonally(seasonKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useMonthlyQuery<T = Model.MonthlyData>(
  dataId: number,
  options?: UseSbSQOptions<
    Model.MonthlyData,
    T,
    MonthlyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSbSQ({
    ...monthlyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
