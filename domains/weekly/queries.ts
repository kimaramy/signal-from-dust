import type { WeeklyData, YearKey } from '@/lib/model';
import { useSbSQ, type UseSbSQOptions } from '@/lib/react-query';

import { weeklyQueryKeys, type WeeklyQueryKeys } from './queryKeys';

export function useWeeklyListQuery<T = WeeklyData[]>(
  yearKey: YearKey,
  options?: UseSbSQOptions<WeeklyData[], T, WeeklyQueryKeys['list']['queryKey']>
) {
  const { data } = useSbSQ({
    ...weeklyQueryKeys.list(yearKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useWeeklyQuery<T = WeeklyData>(
  dataId: number,
  options?: UseSbSQOptions<WeeklyData, T, WeeklyQueryKeys['detail']['queryKey']>
) {
  const { data } = useSbSQ({
    ...weeklyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
