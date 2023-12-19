import {
  useSupabaseSuspendedQuery,
  type UseSupabaseSuspendedQueryOptions,
} from '@/lib/react-query';
import { type MonthKey } from '@/components/month';

import type { WeekDailyData } from '..';
import { weekDailyQueryKeys, type WeekDailyQueryKeys } from './queryKeys';

export function useWeekDailyListQuery<T = WeekDailyData[]>(
  monthKey: MonthKey,
  options?: UseSupabaseSuspendedQueryOptions<
    WeekDailyData[],
    T,
    WeekDailyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSupabaseSuspendedQuery({
    ...weekDailyQueryKeys.list(monthKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useWeekDailyQuery<T = WeekDailyData>(
  dataId: number,
  options?: UseSupabaseSuspendedQueryOptions<
    WeekDailyData,
    T,
    WeekDailyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSupabaseSuspendedQuery({
    ...weekDailyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
