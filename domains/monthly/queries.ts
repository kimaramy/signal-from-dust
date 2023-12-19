import {
  useSupabaseSuspendedQuery,
  type UseSupabaseSuspendedQueryOptions,
} from '@/lib/react-query';
import { type SeasonKey } from '@/components/season';
import { type YearKey } from '@/components/year';

import type { MonthlyData } from '..';
import { monthlyQueryKeys, type MonthlyQueryKeys } from './queryKeys';

export function useMonthlyListQuery<T = MonthlyData[]>(
  yearKey: YearKey,
  options?: UseSupabaseSuspendedQueryOptions<
    MonthlyData[],
    T,
    MonthlyQueryKeys['list']['queryKey']
  >
) {
  const { data } = useSupabaseSuspendedQuery({
    ...monthlyQueryKeys.list(yearKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useMonthlyListQueryBySeason<T = MonthlyData[]>(
  yearKey: YearKey,
  seasonKey: SeasonKey,
  options?: UseSupabaseSuspendedQueryOptions<
    MonthlyData[],
    T,
    MonthlyQueryKeys['list']['_ctx']['seasonally']['queryKey']
  >
) {
  const { data } = useSupabaseSuspendedQuery({
    ...monthlyQueryKeys.list(yearKey)._ctx.seasonally(seasonKey),
    staleTime: Infinity,
    ...options,
  });
  return data;
}

export function useMonthlyQuery<T = MonthlyData>(
  dataId: number,
  options?: UseSupabaseSuspendedQueryOptions<
    MonthlyData,
    T,
    MonthlyQueryKeys['detail']['queryKey']
  >
) {
  const { data } = useSupabaseSuspendedQuery({
    ...monthlyQueryKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  });
  return data;
}
