"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import {
  DataUnit,
  useDailyDataListQuery,
  useMonthlyDataListQuery,
  useWeekDailyDataListQuery,
  useWeeklyDataListQuery,
  useYearlyDataListQuery,
} from "@/domains"

import {
  Sequence,
  toDailySceneDataList,
  toMonthlySceneDataList,
  toWeekDailySceneDataList,
  toWeeklySceneDataList,
  toYearlySceneDataList,
} from "@/components/sequence"

export default function IndexPage() {
  const searchParams = useSearchParams()

  const q = (searchParams.get("q") as DataUnit) ?? "daily"

  const year = searchParams.get("year") ?? "0"

  const month = searchParams.get("month") ?? "0"

  const dailySceneDataList = useDailyDataListQuery(Number(month), {
    enabled: q === "daily",
    select: toDailySceneDataList,
  })

  const weekDailySceneDataList = useWeekDailyDataListQuery(Number(month), {
    enabled: q === "weekdaily",
    select: toWeekDailySceneDataList,
  })

  const weeklySceneDataList = useWeeklyDataListQuery(Number(year), {
    enabled: q === "weekly",
    select: toWeeklySceneDataList,
  })

  const monthlySceneDataList = useMonthlyDataListQuery(Number(year), {
    enabled: q === "monthly",
    select: toMonthlySceneDataList,
  })

  const yearlySceneDataList = useYearlyDataListQuery({
    enabled: q === "yearly",
    select: toYearlySceneDataList,
  })

  const dataset = useMemo(() => {
    switch (q) {
      case "yearly":
        return yearlySceneDataList
      case "monthly":
        return monthlySceneDataList
      case "weekly":
        return weeklySceneDataList
      case "weekdaily":
        return weekDailySceneDataList
      case "daily":
      default:
        return dailySceneDataList
    }
  }, [
    dailySceneDataList,
    monthlySceneDataList,
    q,
    weekDailySceneDataList,
    weeklySceneDataList,
    yearlySceneDataList,
  ])

  return (
    <main className="container">
      <Sequence id="first" dataset={dataset} />
    </main>
  )
}
