import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import type { WeekDailyData, SupabaseError } from "../types"
import { WeekDailyDataKeys, weekDailyDataKeys } from "./query-keys"

export function useWeekDailyDataListQuery<T = WeekDailyData[]>(
  options?: UseQueryOptions<
  WeekDailyData[],
    SupabaseError,
    T,
    WeekDailyDataKeys["list"]["queryKey"]
  >
) {
  const { data } = useQuery({
    ...weekDailyDataKeys.list(),
    staleTime: Infinity,
    ...options,
  })
  return data!
}

export function useWeekDailyDataQuery<T = WeekDailyData>(
  dataId: number,
  options?: UseQueryOptions<
  WeekDailyData,
    SupabaseError,
    T,
    WeekDailyDataKeys["detail"]["queryKey"]
  >
) {
  const { data } = useQuery({
    ...weekDailyDataKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  })
  return data!
}
