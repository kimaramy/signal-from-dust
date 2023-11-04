import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { type MonthKey } from '@/components/month';

import type { DailyData, SupabaseError } from '../types';
import { DailyDataKeys, dailyDataKeys } from './queryKeys';

export function useDailyDataListQuery<T = DailyData[]>(
  monthKey: MonthKey,
  options?: UseQueryOptions<
    DailyData[],
    SupabaseError,
    T,
    DailyDataKeys['list']['queryKey']
  >
) {
  const { data } = useQuery({
    ...dailyDataKeys.list(monthKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useDailyDataQuery<T = DailyData>(
  dataId: number,
  options?: UseQueryOptions<
    DailyData,
    SupabaseError,
    T,
    DailyDataKeys['detail']['queryKey']
  >
) {
  const { data } = useQuery({
    ...dailyDataKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
