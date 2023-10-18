import { createQueryKeys, inferQueryKeys } from "@lukemorales/query-key-factory"

import * as services from "./services"

export const weekDailyDataKeys = createQueryKeys("weekdaily", {
  detail: (dataId: number) => ({
    queryKey: [dataId],
    queryFn: () => services.fetchWeekDailyData(dataId),
  }),
  list: (month: number) => ({
    queryKey: [{ month }],
    queryFn: () => services.fetchWeekDailyDataList(month),
  }),
})

export type WeekDailyDataKeys = inferQueryKeys<typeof weekDailyDataKeys>
