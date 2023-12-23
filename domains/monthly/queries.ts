import { AppData, AppSeason, AppYear } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { monthlyQueryKeys, type MonthlyQueryKeys } from './queryKeys';

export function useMonthlyListQuery<T = AppData.MonthlyData[]>(
  yearKey: AppYear.Key,
  options?: UseSbSQOptions<
    AppData.MonthlyData[],
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

export function useMonthlyListQueryBySeason<T = AppData.MonthlyData[]>(
  yearKey: AppYear.Key,
  seasonKey: AppSeason.Key,
  options?: UseSbSQOptions<
    AppData.MonthlyData[],
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

export function useMonthlyQuery<T = AppData.MonthlyData>(
  dataId: number,
  options?: UseSbSQOptions<
    AppData.MonthlyData,
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
