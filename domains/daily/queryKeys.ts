import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { MonthUtils } from '@/lib/model';

import * as services from './services';

export const dailyQueryKeys = createQueryKeys('daily', {
  detail(dataId: number) {
    return {
      queryKey: [dataId],
      queryFn: () => services.fetchDailyData(dataId),
    };
  },
  list(monthKey: MonthUtils.Key) {
    const month = MonthUtils.schema.getValue(monthKey);
    return {
      queryKey: [{ month }],
      queryFn: () => services.fetchDailyDataset(month),
    };
  },
});

export type DailyQueryKeys = inferQueryKeys<typeof dailyQueryKeys>;
