import { Model } from '@/lib/model';
import {
  useSupabaseSuspenseQuery,
  type UseSupabaseSuspenseQueryOptions,
} from '@/lib/react-query';

import { yearlyQueryKeys, type YearlyQueryKeys } from './queryKeys';

export function useYearlyListQuery<T = Model.YearlyData[]>(
  options?: UseSupabaseSuspenseQueryOptions<
    Model.YearlyData[],
    T,
    YearlyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSupabaseSuspenseQuery({
    ...yearlyQueryKeys.list(),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useYearlyQuery<T = Model.YearlyData>(
  dataId: number,
  options?: UseSupabaseSuspenseQueryOptions<
    Model.YearlyData,
    T,
    YearlyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSupabaseSuspenseQuery({
    ...yearlyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useDistinctYearListQuery<T = Model.DistinctYearData[]>(
  options?: UseSupabaseSuspenseQueryOptions<
    Model.DistinctYearData[],
    T,
    YearlyQueryKeys['distinctYearList']['queryKey']
  >
) {
  const { data } = useSupabaseSuspenseQuery({
    ...yearlyQueryKeys.distinctYearList(),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
