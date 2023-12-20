import type { DistinctYearData, YearlyData } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { yearlyQueryKeys, type YearlyQueryKeys } from './queryKeys';

export function useYearlyListQuery<T = YearlyData[]>(
  options?: UseSbSQOptions<YearlyData[], T, YearlyQueryKeys['list']['queryKey']>
) {
  const { data } = useSbSQ({
    ...yearlyQueryKeys.list(),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useYearlyQuery<T = YearlyData>(
  dataId: number,
  options?: UseSbSQOptions<YearlyData, T, YearlyQueryKeys['detail']['queryKey']>
) {
  const { data } = useSbSQ({
    ...yearlyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useDistinctYearListQuery<T = DistinctYearData[]>(
  options?: UseSbSQOptions<
    DistinctYearData[],
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
