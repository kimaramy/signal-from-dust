import { createQueryKeys, inferQueryKeys } from "@lukemorales/query-key-factory"

import * as services from "./services"

export const monthlyDataKeys = createQueryKeys("monthly", {
  detail: (dataId: number) => ({
    queryKey: [dataId],
    queryFn: () => services.fetchMonthlyData(dataId),
  }),
  list: (year: number) => ({
    queryKey: [{ year }],
    queryFn: () => services.fetchMonthlyDataList(year),
  }),
})

export type MonthlyDataKeys = inferQueryKeys<typeof monthlyDataKeys>
