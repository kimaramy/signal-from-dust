import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import type { SupabaseError, YearlyData } from '../types';
import { yearlyQueryKeys, type YearlyQueryKeys } from './queryKeys';

export function useYearlyListQuery<T = YearlyData[]>(
  options?: UseQueryOptions<
    YearlyData[],
    SupabaseError,
    T,
    YearlyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useQuery({
    ...yearlyQueryKeys.list(),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useYearlyQuery<T = YearlyData>(
  dataId: number,
  options?: UseQueryOptions<
    YearlyData,
    SupabaseError,
    T,
    YearlyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useQuery({
    ...yearlyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
