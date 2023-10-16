import { supabaseClient } from "../supabase-client"
import type { DailyData } from "../types"

export const fetchDailyDataList = async (filters?: unknown) => {
  const response = await supabaseClient
    .from("daily")
    .select("*")
    .eq('month', 0)
    .returns<DailyData[]>()

  if (response.error) throw response

  return response.data
}

export const fetchDailyData = async (dataId: number) => {
  const response = await supabaseClient
    .from("daily")
    .select("*")
    .eq("id", dataId)
    .returns<DailyData>()

  if (response.error) throw response

  return response.data
}
