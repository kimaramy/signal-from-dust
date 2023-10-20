"use client"

import { useQueryParam } from "@/hooks"

import { QueryParamEnum } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface LocationSelectProps {}

export default function LocationSelect() {
  const [location] = useQueryParam(QueryParamEnum.Location, "Seoul")

  return (
    <Select value={location}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="장소 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Seoul">서울</SelectItem>
      </SelectContent>
    </Select>
  )
}
