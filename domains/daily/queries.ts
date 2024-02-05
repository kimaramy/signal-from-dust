import { Model, MonthUtils } from '@/lib/model';
import {
  useSupabaseSuspenseQuery,
  type UseSupabaseSuspenseQueryOptions,
} from '@/lib/react-query';

import { dailyQueryKeys, type DailyQueryKeys } from './queryKeys';

export function useDailyListQuery<T = Model.DailyData[]>(
  monthKey: MonthUtils.Key,
  options?: UseSupabaseSuspenseQueryOptions<
    Model.DailyData[],
    T,
    DailyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSupabaseSuspenseQuery({
    ...dailyQueryKeys.list(monthKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useDailyQuery<T = Model.DailyData>(
  dataId: number,
  options?: UseSupabaseSuspenseQueryOptions<
    Model.DailyData,
    T,
    DailyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSupabaseSuspenseQuery({
    ...dailyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
