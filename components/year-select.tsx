"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { DataUnit } from "@/domains"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect } from "react"

export interface YearSelectProps {}

export function YearSelect({}: YearSelectProps) {
  const router = useRouter()

  const searchParams = useSearchParams()

  const q = (searchParams.get("q") as DataUnit) ?? "daily"

  const enabled = q === "monthly" || q === "weekly"

  const year = searchParams.get("year") ?? "0"

  const handleValueChange = (value: string) => {
    const queryParams = new URLSearchParams(Array.from(searchParams.entries()))
    queryParams.set("year", value)
    const queryString = `?${queryParams.toString()}`
    router.push(queryString)
  }

  useEffect(() => {
    if (q === 'yearly') {
      const queryParams = new URLSearchParams(Array.from(searchParams.entries()))
      queryParams.set("year", "0")
      const queryString = `?${queryParams.toString()}`
      router.push(queryString)
    }
  }, [q, router, searchParams])

  return (
    <Select disabled={!enabled} value={year} onValueChange={handleValueChange}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select an year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">All Years</SelectItem>
        <SelectItem value="2022">2022</SelectItem>
        <SelectItem value="2021">2021</SelectItem>
        <SelectItem value="2020">2020</SelectItem>
        <SelectItem value="2019">2019</SelectItem>
        <SelectItem value="2018">2018</SelectItem>
        <SelectItem value="2017">2017</SelectItem>
        <SelectItem value="2016">2016</SelectItem>
        <SelectItem value="2015">2015</SelectItem>
      </SelectContent>
    </Select>
  )
}
