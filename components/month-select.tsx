"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { DataUnit } from "@/domains"

import { toMonthName } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface MonthSelectProps {}

export function MonthSelect({}: MonthSelectProps) {
  const router = useRouter()

  const searchParams = useSearchParams()

  const q = (searchParams.get("q") as DataUnit) ?? "daily"

  const visible = q === "daily" || q === "weekdaily"

  const month = searchParams.get("month") ?? "0"

  const handleValueChange = (value: string) => {
    const queryParams = new URLSearchParams(Array.from(searchParams.entries()))
    queryParams.set("month", value)
    const queryString = `?${queryParams.toString()}`
    router.push(queryString)
  }

  if (!visible) return null

  return (
    <Select value={month} onValueChange={handleValueChange}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select a month" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">All Months</SelectItem>
        {new Array(12).fill(null).map((_, i) => (
          <SelectItem key={i} value={(i + 1).toString()}>
            {toMonthName(i + 1, "long")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
