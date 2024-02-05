import { Model, YearUtils } from '@/lib/model';
import {
  useSupabaseSuspenseQuery,
  type UseSupabaseSuspenseQueryOptions,
} from '@/lib/react-query';

import { weeklyQueryKeys, type WeeklyQueryKeys } from './queryKeys';

export function useWeeklyListQuery<T = Model.WeeklyData[]>(
  yearKey: YearUtils.Key,
  options?: UseSupabaseSuspenseQueryOptions<
    Model.WeeklyData[],
    T,
    WeeklyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSupabaseSuspenseQuery({
    ...weeklyQueryKeys.list(yearKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useWeeklyQuery<T = Model.WeeklyData>(
  dataId: number,
  options?: UseSupabaseSuspenseQueryOptions<
    Model.WeeklyData,
    T,
    WeeklyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSupabaseSuspenseQuery({
    ...weeklyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
