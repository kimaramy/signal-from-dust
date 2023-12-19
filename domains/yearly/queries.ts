import {
  useSupabaseSuspendedQuery,
  type UseSupabaseSuspendedQueryOptions,
} from '@/lib/react-query';

import type { DistinctYearData, YearlyData } from '..';
import { yearlyQueryKeys, type YearlyQueryKeys } from './queryKeys';

export function useYearlyListQuery<T = YearlyData[]>(
  options?: UseSupabaseSuspendedQueryOptions<
    YearlyData[],
    T,
    YearlyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSupabaseSuspendedQuery({
    ...yearlyQueryKeys.list(),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useYearlyQuery<T = YearlyData>(
  dataId: number,
  options?: UseSupabaseSuspendedQueryOptions<
    YearlyData,
    T,
    YearlyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSupabaseSuspendedQuery({
    ...yearlyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useDistinctYearListQuery<T = DistinctYearData[]>(
  options?: UseSupabaseSuspendedQueryOptions<
    DistinctYearData[],
    T,
    YearlyQueryKeys['distinctYearList']['queryKey']
  >
) {
  const { data } = useSupabaseSuspendedQuery({
    ...yearlyQueryKeys.distinctYearList(),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
