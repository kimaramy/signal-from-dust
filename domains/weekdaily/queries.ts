import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { type MonthKey } from '@/components/month';

import type { SupabaseError, WeekDailyData } from '../types';
import { weekDailyQueryKeys, type WeekDailyQueryKeys } from './queryKeys';

export function useWeekDailyListQuery<T = WeekDailyData[]>(
  monthKey: MonthKey,
  options?: UseQueryOptions<
    WeekDailyData[],
    SupabaseError,
    T,
    WeekDailyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useQuery({
    ...weekDailyQueryKeys.list(monthKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useWeekDailyQuery<T = WeekDailyData>(
  dataId: number,
  options?: UseQueryOptions<
    WeekDailyData,
    SupabaseError,
    T,
    WeekDailyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useQuery({
    ...weekDailyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
