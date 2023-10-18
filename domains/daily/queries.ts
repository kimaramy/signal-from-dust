import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import type { DailyData, SupabaseError } from "../types"
import { DailyDataKeys, dailyDataKeys } from "./query-keys"

export function useDailyDataListQuery<T = DailyData[]>(
  month: number = 0,
  options?: UseQueryOptions<
    DailyData[],
    SupabaseError,
    T,
    DailyDataKeys["list"]["queryKey"]
  >
) {
  const { data } = useQuery({
    ...dailyDataKeys.list(month),
    staleTime: Infinity,
    ...options,
  })
  return data
}

export function useDailyDataQuery<T = DailyData>(
  dataId: number,
  options?: UseQueryOptions<
    DailyData,
    SupabaseError,
    T,
    DailyDataKeys["detail"]["queryKey"]
  >
) {
  const { data } = useQuery({
    ...dailyDataKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  })
  return data
}
