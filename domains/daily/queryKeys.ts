import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import * as services from './services';

export const dailyDataKeys = createQueryKeys('daily', {
  detail: (dataId: number) => ({
    queryKey: [dataId],
    queryFn: () => services.fetchDailyData(dataId),
  }),
  list: (month: number) => ({
    queryKey: [{ month }],
    queryFn: () => services.fetchDailyDataList(month),
  }),
});

export type DailyDataKeys = inferQueryKeys<typeof dailyDataKeys>;
