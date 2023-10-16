import { supabaseClient } from "../supabase-client"
import type { WeekDailyData } from "../types"

export const fetchWeekDailyDataList = async (filters?: unknown) => {
  const response = await supabaseClient
    .from("weekdaily")
    .select("*")
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
