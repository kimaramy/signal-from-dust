import type { Database } from "./supabase"

export type Tables = Database["public"]["Tables"]

export type DailyData = Tables["daily"]["Row"]

export type WeekDailyData = Tables["weekdaily"]["Row"]
