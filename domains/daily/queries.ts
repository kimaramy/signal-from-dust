import {
  useSupabaseSuspendedQuery,
  type UseSupabaseSuspendedQueryOptions,
} from '@/lib/react-query';
import { type MonthKey } from '@/components/month';

import type { DailyData } from '..';
import { dailyQueryKeys, type DailyQueryKeys } from './queryKeys';

export function useDailyListQuery<T = DailyData[]>(
  monthKey: MonthKey,
  options?: UseSupabaseSuspendedQueryOptions<
    DailyData[],
    T,
    DailyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSupabaseSuspendedQuery({
    ...dailyQueryKeys.list(monthKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useDailyQuery<T = DailyData>(
  dataId: number,
  options?: UseSupabaseSuspendedQueryOptions<
    DailyData,
    T,
    DailyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSupabaseSuspendedQuery({
    ...dailyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
