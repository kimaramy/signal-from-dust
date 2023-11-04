import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { type MonthKey } from '@/components/month';

import * as services from './services';

export const dailyDataKeys = createQueryKeys('daily', {
  detail: (dataId: number) => ({
    queryKey: [dataId],
    queryFn: () => services.fetchDailyData(dataId),
  }),
  list: (monthKey: MonthKey) => ({
    queryKey: [{ monthKey }],
    queryFn: () => services.fetchDailyDataList(monthKey),
  }),
});

export type DailyDataKeys = inferQueryKeys<typeof dailyDataKeys>;
