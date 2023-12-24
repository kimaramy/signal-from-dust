import { Model, YearUtils } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { weeklyQueryKeys, type WeeklyQueryKeys } from './queryKeys';

export function useWeeklyListQuery<T = Model.WeeklyData[]>(
  yearKey: YearUtils.Key,
  options?: UseSbSQOptions<
    Model.WeeklyData[],
    T,
    WeeklyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSbSQ({
    ...weeklyQueryKeys.list(yearKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useWeeklyQuery<T = Model.WeeklyData>(
  dataId: number,
  options?: UseSbSQOptions<
    Model.WeeklyData,
    T,
    WeeklyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSbSQ({
    ...weeklyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
