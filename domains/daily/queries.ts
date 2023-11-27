import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { type MonthKey } from '@/components/month';

import type { DailyData, SupabaseError } from '..';
import { dailyQueryKeys, type DailyQueryKeys } from './queryKeys';

export function useDailyListQuery<T = DailyData[]>(
  monthKey: MonthKey,
  options?: UseQueryOptions<
    DailyData[],
    SupabaseError,
    T,
    DailyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useQuery({
    ...dailyQueryKeys.list(monthKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useDailyQuery<T = DailyData>(
  dataId: number,
  options?: UseQueryOptions<
    DailyData,
    SupabaseError,
    T,
    DailyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useQuery({
    ...dailyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
