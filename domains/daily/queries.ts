import { Model, MonthUtils } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { dailyQueryKeys, type DailyQueryKeys } from './queryKeys';

export function useDailyListQuery<T = Model.DailyData[]>(
  monthKey: MonthUtils.Key,
  options?: UseSbSQOptions<
    Model.DailyData[],
    T,
    DailyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSbSQ({
    ...dailyQueryKeys.list(monthKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useDailyQuery<T = Model.DailyData>(
  dataId: number,
  options?: UseSbSQOptions<
    Model.DailyData,
    T,
    DailyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSbSQ({
    ...dailyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
