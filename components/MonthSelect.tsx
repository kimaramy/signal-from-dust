"use client"

import { DataUnit } from "@/domains"
import { useQueryParam, useSetQueryParam } from "@/hooks"

import { QueryParamEnum, toMonthName } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const months = new Array(12).fill(0).map((_, i) => i + 1)

export interface MonthSelectProps {}

export default function MonthSelect() {
  const [dataUnit] = useQueryParam<DataUnit>(QueryParamEnum.DataUnit, "daily")

  const [month] = useQueryParam(QueryParamEnum.Month, "0")

  const setMonth = useSetQueryParam(QueryParamEnum.Month)

  const isVisible = dataUnit === "daily" || dataUnit === "weekdaily"

  if (!isVisible) return null

  return (
    <Select value={month} onValueChange={(value) => setMonth(value)}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="월 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">월 전체</SelectItem>
        {months.map((month) => (
          <SelectItem key={month} value={`${month}`}>
            {toMonthName(month, "long")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
