import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { type YearKey } from '@/components/year';

import type { SupabaseError, WeeklyData } from '../types';
import { weeklyQueryKeys, type WeeklyQueryKeys } from './queryKeys';

export function useWeeklyListQuery<T = WeeklyData[]>(
  yearKey: YearKey,
  options?: UseQueryOptions<
    WeeklyData[],
    SupabaseError,
    T,
    WeeklyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useQuery({
    ...weeklyQueryKeys.list(yearKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useWeeklyQuery<T = WeeklyData>(
  dataId: number,
  options?: UseQueryOptions<
    WeeklyData,
    SupabaseError,
    T,
    WeeklyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useQuery({
    ...weeklyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
