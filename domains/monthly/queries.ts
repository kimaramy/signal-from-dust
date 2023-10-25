import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Season } from '@/components/season';
import { Year } from '@/components/year';

import type { MonthlyData, SupabaseError } from '../types';
import { MonthlyDataKeys, monthlyDataKeys } from './queryKeys';

export function useMonthlyDataListQuery<T = MonthlyData[]>(
  year: Year = 0,
  options?: UseQueryOptions<
    MonthlyData[],
    SupabaseError,
    T,
    MonthlyDataKeys['list']['queryKey']
  >
) {
  const { data } = useQuery({
    ...monthlyDataKeys.list(year),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useMonthlyDataListQueryBySeaon<T = MonthlyData[]>(
  year: Year = 0,
  season: Season,
  options?: UseQueryOptions<
    MonthlyData[],
    SupabaseError,
    T,
    MonthlyDataKeys['list']['_ctx']['seasonal']['queryKey']
  >
) {
  const { data } = useQuery({
    ...monthlyDataKeys.list(year)._ctx.seasonal(season),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useMonthlyDataQuery<T = MonthlyData>(
  dataId: number,
  options?: UseQueryOptions<
    MonthlyData,
    SupabaseError,
    T,
    MonthlyDataKeys['detail']['queryKey']
  >
) {
  const { data } = useQuery({
    ...monthlyDataKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
