import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import type { MonthlyData, SupabaseError } from "../types"
import { MonthlyDataKeys, monthlyDataKeys } from "./queryKeys"

export function useMonthlyDataListQuery<T = MonthlyData[]>(
  year: number = 0,
  options?: UseQueryOptions<
    MonthlyData[],
    SupabaseError,
    T,
    MonthlyDataKeys["list"]["queryKey"]
  >
) {
  const { data } = useQuery({
    ...monthlyDataKeys.list(year),
    staleTime: Infinity,
    ...options,
  })
  return data
}

export function useMonthlyDataQuery<T = MonthlyData>(
  dataId: number,
  options?: UseQueryOptions<
    MonthlyData,
    SupabaseError,
    T,
    MonthlyDataKeys["detail"]["queryKey"]
  >
) {
  const { data } = useQuery({
    ...monthlyDataKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  })
  return data
}
