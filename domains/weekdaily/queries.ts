import { Model, MonthUtils } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { weekDailyQueryKeys, type WeekDailyQueryKeys } from './queryKeys';

export function useWeekDailyListQuery<T = Model.WeekDailyData[]>(
  monthKey: MonthUtils.Key,
  options?: UseSbSQOptions<
    Model.WeekDailyData[],
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

export function useWeekDailyQuery<T = Model.WeekDailyData>(
  dataId: number,
  options?: UseSbSQOptions<
    Model.WeekDailyData,
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
