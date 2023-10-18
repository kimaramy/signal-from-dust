"use client"

import { useRouter, useSearchParams } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface DataUnitSelectProps {}

export function DataUnitSelect({}: DataUnitSelectProps) {
  const router = useRouter()

  const searchParams = useSearchParams()

  const q = searchParams.get("q") ?? "daily"

  const handleValueChange = (value: string) => {
    const queryParams = new URLSearchParams(Array.from(searchParams.entries()))
    queryParams.set("q", value)
    const queryString = `?${queryParams.toString()}`
    router.push(queryString)
  }

  return (
    <Select value={q} onValueChange={handleValueChange}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select a unit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="daily">Daily</SelectItem>
        <SelectItem value="weekdaily">Weekdaily</SelectItem>
        <SelectItem value="weekly">Weekly</SelectItem>
        <SelectItem value="monthly">Monthly</SelectItem>
        <SelectItem value="yearly">Yearly</SelectItem>
      </SelectContent>
    </Select>
  )
}
