import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { monthSchema, type MonthKey } from '@/components/month';

import * as services from './services';

export const dailyQueryKeys = createQueryKeys('daily', {
  detail(dataId: number) {
    return {
      queryKey: [dataId],
      queryFn: () => services.fetchDailyData(dataId),
    };
  },
  list(monthKey: MonthKey) {
    const month = monthSchema.getValue(monthKey);
    return {
      queryKey: [{ month }],
      queryFn: () => services.fetchDailyDataset(month),
    };
  },
});

export type DailyQueryKeys = inferQueryKeys<typeof dailyQueryKeys>;
