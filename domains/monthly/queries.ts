import type { MonthlyData, SeasonKey, YearKey } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { monthlyQueryKeys, type MonthlyQueryKeys } from './queryKeys';

export function useMonthlyListQuery<T = MonthlyData[]>(
  yearKey: YearKey,
  options?: UseSbSQOptions<
    MonthlyData[],
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

export function useMonthlyListQueryBySeason<T = MonthlyData[]>(
  yearKey: YearKey,
  seasonKey: SeasonKey,
  options?: UseSbSQOptions<
    MonthlyData[],
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

export function useMonthlyQuery<T = MonthlyData>(
  dataId: number,
  options?: UseSbSQOptions<
    MonthlyData,
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
