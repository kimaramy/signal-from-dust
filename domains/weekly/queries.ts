import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { type YearKey } from '@/components/year';

import type { SupabaseError, WeeklyData } from '../types';
import { WeeklyDataKeys, weeklyDataKeys } from './queryKeys';

export function useWeeklyDataListQuery<T = WeeklyData[]>(
  yearKey: YearKey,
  options?: UseQueryOptions<
    WeeklyData[],
    SupabaseError,
    T,
    WeeklyDataKeys['list']['queryKey']
  >
) {
  const { data } = useQuery({
    ...weeklyDataKeys.list(yearKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useWeeklyDataQuery<T = WeeklyData>(
  dataId: number,
  options?: UseQueryOptions<
    WeeklyData,
    SupabaseError,
    T,
    WeeklyDataKeys['detail']['queryKey']
  >
) {
  const { data } = useQuery({
    ...weeklyDataKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
