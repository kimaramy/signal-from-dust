import { AppData, AppMonth } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { weekDailyQueryKeys, type WeekDailyQueryKeys } from './queryKeys';

export function useWeekDailyListQuery<T = AppData.WeekDailyData[]>(
  monthKey: AppMonth.Key,
  options?: UseSbSQOptions<
    AppData.WeekDailyData[],
    T,
    WeekDailyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSbSQ({
    ...weekDailyQueryKeys.list(monthKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useWeekDailyQuery<T = AppData.WeekDailyData>(
  dataId: number,
  options?: UseSbSQOptions<
    AppData.WeekDailyData,
    T,
    WeekDailyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSbSQ({
    ...weekDailyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
