import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { SeasonValue } from '@/components/season';
import { Year } from '@/components/year';

import type { MonthlyData, SupabaseError } from '../types';
import { MonthlyQueryKeys, monthlyQueryKeys } from './queryKeys';

export function useMonthlyListQuery<T = MonthlyData[]>(
  yearValue: Year = 0,
  options?: UseQueryOptions<
    MonthlyData[],
    SupabaseError,
    T,
    MonthlyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useQuery({
    ...monthlyQueryKeys.list(yearValue),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useMonthlyListQueryBySeaon<T = MonthlyData[]>(
  yearValue: Year = 0,
  seasonValue: SeasonValue,
  options?: UseQueryOptions<
    MonthlyData[],
    SupabaseError,
    T,
    MonthlyQueryKeys['list']['_ctx']['seasonal']['queryKey']
  >
) {
  const { data } = useQuery({
    ...monthlyQueryKeys.list(yearValue)._ctx.seasonal(seasonValue),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useMonthlyQuery<T = MonthlyData>(
  dataId: number,
  options?: UseQueryOptions<
    MonthlyData,
    SupabaseError,
    T,
    MonthlyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useQuery({
    ...monthlyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
