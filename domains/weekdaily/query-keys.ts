import { createQueryKeys, inferQueryKeys } from "@lukemorales/query-key-factory"

import * as services from "./services"

export const weekDailyDataKeys = createQueryKeys("weekdaily", {
  detail: (dataId: number) => ({
    queryKey: [dataId],
    queryFn: () => services.fetchWeekDailyData(dataId),
  }),
  list: (filters?: {}) => ({
    queryKey: [{ ...filters }],
    queryFn: () => services.fetchWeekDailyDataList(filters),
  }),
})

export type WeekDailyDataKeys = inferQueryKeys<typeof weekDailyDataKeys>
