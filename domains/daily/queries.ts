import { AppData, AppMonth } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { dailyQueryKeys, type DailyQueryKeys } from './queryKeys';

export function useDailyListQuery<T = AppData.DailyData[]>(
  monthKey: AppMonth.Key,
  options?: UseSbSQOptions<
    AppData.DailyData[],
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

export function useDailyQuery<T = AppData.DailyData>(
  dataId: number,
  options?: UseSbSQOptions<
    AppData.DailyData,
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
