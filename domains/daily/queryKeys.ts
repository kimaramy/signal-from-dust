import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { AppMonth } from '@/lib/model';

import * as services from './services';

export const dailyQueryKeys = createQueryKeys('daily', {
  detail(dataId: number) {
    return {
      queryKey: [dataId],
      queryFn: () => services.fetchDailyData(dataId),
    };
  },
  list(monthKey: AppMonth.Key) {
    const month = AppMonth.schema.getValue(monthKey);
    return {
      queryKey: [{ month }],
      queryFn: () => services.fetchDailyDataset(month),
    };
  },
});

export type DailyQueryKeys = inferQueryKeys<typeof dailyQueryKeys>;
