import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { type SeasonKey } from '@/components/season';
import { type YearKey } from '@/components/year';

import type { MonthlyData, SupabaseError } from '../types';
import { monthlyQueryKeys, type MonthlyQueryKeys } from './queryKeys';

export function useMonthlyListQuery<T = MonthlyData[]>(
  yearKey: YearKey,
  options?: UseQueryOptions<
    MonthlyData[],
    SupabaseError,
    T,
    MonthlyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useQuery({
    ...monthlyQueryKeys.list(yearKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useMonthlyListQueryBySeason<T = MonthlyData[]>(
  yearKey: YearKey,
  seasonKey: SeasonKey,
  options?: UseQueryOptions<
    MonthlyData[],
    SupabaseError,
    T,
    MonthlyQueryKeys['list']['_ctx']['seasonal']['queryKey']
  >
) {
  const { data } = useQuery({
    ...monthlyQueryKeys.list(yearKey)._ctx.seasonal(seasonKey),
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
