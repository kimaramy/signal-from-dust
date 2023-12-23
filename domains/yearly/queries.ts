import { AppData } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { yearlyQueryKeys, type YearlyQueryKeys } from './queryKeys';

export function useYearlyListQuery<T = AppData.YearlyData[]>(
  options?: UseSbSQOptions<
    AppData.YearlyData[],
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

export function useYearlyQuery<T = AppData.YearlyData>(
  dataId: number,
  options?: UseSbSQOptions<
    AppData.YearlyData,
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

export function useDistinctYearListQuery<T = AppData.DistinctYearData[]>(
  options?: UseSbSQOptions<
    AppData.DistinctYearData[],
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
