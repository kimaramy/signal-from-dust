"use client"

import { useEffect } from "react"
import type { DataUnit } from "@/domains"
import { useQueryParam, useSetQueryParam } from "@/hooks"

import { QueryParamEnum } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const years = new Array(8).fill(2015).map((value, i) => value + i + 1)

export interface YearSelectProps {}

export default function YearSelect() {
  const [dataUnit] = useQueryParam<DataUnit>(QueryParamEnum.DataUnit, "daily")

  const [year] = useQueryParam(QueryParamEnum.Year, "0")

  const setYear = useSetQueryParam(QueryParamEnum.Year)

  const isDiabled = dataUnit !== "weekly" && dataUnit !== "monthly"

  useEffect(() => {
    if (dataUnit === "yearly") setYear("0")
  }, [dataUnit])

  return (
    <Select
      value={year}
      disabled={isDiabled}
      onValueChange={(value) => setYear(value)}
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder="연도 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">연도 전체</SelectItem>
        {years.reverse().map((year) => (
          <SelectItem key={year} value={`${year}`}>
            {year}년
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
