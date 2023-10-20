"use client"

import { DataUnit } from "@/domains"
import { useQueryParam, useSetQueryParam } from "@/hooks"

import { QueryParamEnum } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface DataUnitSelectProps {}

export default function DataUnitSelect() {
  const [dataUnit] = useQueryParam<DataUnit>(QueryParamEnum.DataUnit, "daily")

  const setDataUnit = useSetQueryParam(QueryParamEnum.DataUnit)

  return (
    <Select value={dataUnit} onValueChange={(value) => setDataUnit(value)}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="단위 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="yearly">연도별</SelectItem>
        <SelectItem value="monthly">월별</SelectItem>
        <SelectItem value="daily">일별</SelectItem>
        <SelectItem value="weekly">주별</SelectItem>
        <SelectItem value="weekdaily">요일별</SelectItem>
      </SelectContent>
    </Select>
  )
}
