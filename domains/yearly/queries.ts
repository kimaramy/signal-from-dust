import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import type { SupabaseError, YearlyData } from "../types"
import { YearlyDataKeys, yearlyDataKeys } from "./queryKeys"

export function useYearlyDataListQuery<T = YearlyData[]>(
  options?: UseQueryOptions<
    YearlyData[],
    SupabaseError,
    T,
    YearlyDataKeys["list"]["queryKey"]
  >
) {
  const { data } = useQuery({
    ...yearlyDataKeys.list(),
    staleTime: Infinity,
    ...options,
  })
  return data
}

export function useYearlyDataQuery<T = YearlyData>(
  dataId: number,
  options?: UseQueryOptions<
    YearlyData,
    SupabaseError,
    T,
    YearlyDataKeys["detail"]["queryKey"]
  >
) {
  const { data } = useQuery({
    ...yearlyDataKeys.detail(dataId),
    staleTime: Infinity,
    ...options,
  })
  return data
}
