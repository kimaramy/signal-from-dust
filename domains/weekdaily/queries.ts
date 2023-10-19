import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import type { SupabaseError, WeekDailyData } from "../types"
import { WeekDailyDataKeys, weekDailyDataKeys } from "./queryKeys"

export function useWeekDailyDataListQuery<T = WeekDailyData[]>(
  month: number = 0,
  options?: UseQueryOptions<
    WeekDailyData[],
    SupabaseError,
    T,
    WeekDailyDataKeys["list"]["queryKey"]
  >
) {
  const { data } = useQuery({
    ...weekDailyDataKeys.list(month),
    staleTime: Infinity,
    ...options,
  })
  return data
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
  return data
}
