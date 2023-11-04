import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { type MonthKey } from '@/components/month';

import type { SupabaseError, WeekDailyData } from '../types';
import { WeekDailyDataKeys, weekDailyDataKeys } from './queryKeys';

export function useWeekDailyDataListQuery<T = WeekDailyData[]>(
  monthKey: MonthKey,
  options?: UseQueryOptions<
    WeekDailyData[],
    SupabaseError,
    T,
    WeekDailyDataKeys['list']['queryKey']
  >
) {
  const { data } = useQuery({
    ...weekDailyDataKeys.list(monthKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useWeekDailyDataQuery<T = WeekDailyData>(
  dataId: number,
  options?: UseQueryOptions<
    WeekDailyData,
    SupabaseError,
    T,
    WeekDailyDataKeys['detail']['queryKey']
  >
) {
  const { data } = useQuery({
    ...weekDailyDataKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
