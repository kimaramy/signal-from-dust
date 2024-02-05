import { Model, MonthUtils } from '@/lib/model';
import {
  useSupabaseSuspenseQuery,
  type UseSupabaseSuspenseQueryOptions,
} from '@/lib/react-query';

import { weekDailyQueryKeys, type WeekDailyQueryKeys } from './queryKeys';

export function useWeekDailyListQuery<T = Model.WeekDailyData[]>(
  monthKey: MonthUtils.Key,
  options?: UseSupabaseSuspenseQueryOptions<
    Model.WeekDailyData[],
    T,
    WeekDailyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSupabaseSuspenseQuery({
    ...weekDailyQueryKeys.list(monthKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useWeekDailyQuery<T = Model.WeekDailyData>(
  dataId: number,
  options?: UseSupabaseSuspenseQueryOptions<
    Model.WeekDailyData,
    T,
    WeekDailyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSupabaseSuspenseQuery({
    ...weekDailyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
