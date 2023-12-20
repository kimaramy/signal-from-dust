import { type DailyData, type MonthKey } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { dailyQueryKeys, type DailyQueryKeys } from './queryKeys';

export function useDailyListQuery<T = DailyData[]>(
  monthKey: MonthKey,
  options?: UseSbSQOptions<DailyData[], T, DailyQueryKeys['list']['queryKey']>
) {
  const { data } = useSbSQ({
    ...dailyQueryKeys.list(monthKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useDailyQuery<T = DailyData>(
  dataId: number,
  options?: UseSbSQOptions<DailyData, T, DailyQueryKeys['detail']['queryKey']>
) {
  const { data } = useSbSQ({
    ...dailyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
