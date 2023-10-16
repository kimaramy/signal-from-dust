import { createQueryKeys, inferQueryKeys } from "@lukemorales/query-key-factory"

import * as services from "./services"

export const dailyDataKeys = createQueryKeys("daily", {
  detail: (dataId: number) => ({
    queryKey: [dataId],
    queryFn: () => services.fetchDailyData(dataId),
  }),
  list: (filters?: {}) => ({
    queryKey: [{ ...filters }],
    queryFn: () => services.fetchDailyDataList(filters),
  }),
})

export type DailyDataKeys = inferQueryKeys<typeof dailyDataKeys>
