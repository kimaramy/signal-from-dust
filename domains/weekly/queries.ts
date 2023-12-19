import {
  useSupabaseSuspendedQuery,
  type UseSupabaseSuspendedQueryOptions,
} from '@/lib/react-query';
import { type YearKey } from '@/components/year';

import type { WeeklyData } from '..';
import { weeklyQueryKeys, type WeeklyQueryKeys } from './queryKeys';

export function useWeeklyListQuery<T = WeeklyData[]>(
  yearKey: YearKey,
  options?: UseSupabaseSuspendedQueryOptions<
    WeeklyData[],
    T,
    WeeklyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSupabaseSuspendedQuery({
    ...weeklyQueryKeys.list(yearKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useWeeklyQuery<T = WeeklyData>(
  dataId: number,
  options?: UseSupabaseSuspendedQueryOptions<
    WeeklyData,
    T,
    WeeklyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSupabaseSuspendedQuery({
    ...weeklyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
