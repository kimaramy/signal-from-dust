"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface LocationSelectProps {}

export function LocationSelect({}: LocationSelectProps) {
  return (
    <Select defaultValue="Seoul">
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select a location" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Seoul">Seoul</SelectItem>
      </SelectContent>
    </Select>
  )
}
