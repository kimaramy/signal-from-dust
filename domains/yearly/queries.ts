import { Model } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { yearlyQueryKeys, type YearlyQueryKeys } from './queryKeys';

export function useYearlyListQuery<T = Model.YearlyData[]>(
  options?: UseSbSQOptions<
    Model.YearlyData[],
    T,
    YearlyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSbSQ({
    ...yearlyQueryKeys.list(),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useYearlyQuery<T = Model.YearlyData>(
  dataId: number,
  options?: UseSbSQOptions<
    Model.YearlyData,
    T,
    YearlyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSbSQ({
    ...yearlyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useDistinctYearListQuery<T = Model.DistinctYearData[]>(
  options?: UseSbSQOptions<
    Model.DistinctYearData[],
    T,
    YearlyQueryKeys['distinctYearList']['queryKey']
  >
) {
  const { data } = useSbSQ({
    ...yearlyQueryKeys.distinctYearList(),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
