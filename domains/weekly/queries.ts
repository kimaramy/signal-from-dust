import { AppData, AppYear } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { weeklyQueryKeys, type WeeklyQueryKeys } from './queryKeys';

export function useWeeklyListQuery<T = AppData.WeeklyData[]>(
  yearKey: AppYear.Key,
  options?: UseSbSQOptions<
    AppData.WeeklyData[],
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

export function useWeeklyQuery<T = AppData.WeeklyData>(
  dataId: number,
  options?: UseSbSQOptions<
    AppData.WeeklyData,
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
