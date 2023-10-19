import { supabaseClient } from "../supabaseClient"
import type { WeekDailyData } from "../types"

export const fetchWeekDailyDataList = async (month: number) => {
  const response = await supabaseClient
    .from("weekdaily")
    .select("*")
    .eq("month", month)
    .returns<WeekDailyData[]>()

  if (response.error) throw response

  return response.data
}

export const fetchWeekDailyData = async (dataId: number) => {
  const response = await supabaseClient
    .from("weekdaily")
    .select("*")
    .eq("id", dataId)
    .returns<WeekDailyData>()

  if (response.error) throw response

  return response.data
}
