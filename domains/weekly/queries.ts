import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import type { SupabaseError, WeeklyData } from "../types"
import { WeeklyDataKeys, weeklyDataKeys } from "./queryKeys"

export function useWeeklyDataListQuery<T = WeeklyData[]>(
  year: number = 0,
  options?: UseQueryOptions<
    WeeklyData[],
    SupabaseError,
    T,
    WeeklyDataKeys["list"]["queryKey"]
  >
) {
  const { data } = useQuery({
    ...weeklyDataKeys.list(year),
    staleTime: Infinity,
    ...options,
  })
  return data
}

export function useWeeklyDataQuery<T = WeeklyData>(
  dataId: number,
  options?: UseQueryOptions<
    WeeklyData,
    SupabaseError,
    T,
    WeeklyDataKeys["detail"]["queryKey"]
  >
) {
  const { data } = useQuery({
    ...weeklyDataKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  })
  return data
}
