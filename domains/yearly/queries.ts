import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import type { DistinctYearData, SupabaseError, YearlyData } from '..';
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

export function useDistinctYearListQuery<T = DistinctYearData[]>(
  options?: UseQueryOptions<
    DistinctYearData[],
    SupabaseError,
    T,
    YearlyQueryKeys['distinctYearList']['queryKey']
  >
) {
  const { data } = useQuery({
    ...yearlyQueryKeys.distinctYearList(),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
