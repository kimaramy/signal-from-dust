import { Model, SeasonUtils, YearUtils } from '@/lib/model';
import {
  useSupabaseSuspenseQuery,
  type UseSupabaseSuspenseQueryOptions,
} from '@/lib/react-query';

import { monthlyQueryKeys, type MonthlyQueryKeys } from './queryKeys';

export function useMonthlyListQuery<T = Model.MonthlyData[]>(
  yearKey: YearUtils.Key,
  options?: UseSupabaseSuspenseQueryOptions<
    Model.MonthlyData[],
    T,
    MonthlyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSupabaseSuspenseQuery({
    ...monthlyQueryKeys.list(yearKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useMonthlyListQueryBySeason<T = Model.MonthlyData[]>(
  yearKey: YearUtils.Key,
  seasonKey: SeasonUtils.Key,
  options?: UseSupabaseSuspenseQueryOptions<
    Model.MonthlyData[],
    T,
    MonthlyQueryKeys['list']['_ctx']['seasonally']['queryKey']
  >
) {
  const { data } = useSupabaseSuspenseQuery({
    ...monthlyQueryKeys.list(yearKey)._ctx.seasonally(seasonKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useMonthlyQuery<T = Model.MonthlyData>(
  dataId: number,
  options?: UseSupabaseSuspenseQueryOptions<
    Model.MonthlyData,
    T,
    MonthlyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSupabaseSuspenseQuery({
    ...monthlyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
