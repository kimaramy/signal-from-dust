import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { AppMonth } from '@/lib/model';

import * as services from './services';

export const weekDailyQueryKeys = createQueryKeys('weekdaily', {
  detail(dataId: number) {
    return {
      queryKey: [dataId],
      queryFn: () => services.fetchWeekDailyData(dataId),
    };
  },
  list(monthKey: AppMonth.Key) {
    const month = AppMonth.schema.getValue(monthKey);
    return {
      queryKey: [{ month }],
      queryFn: () => services.fetchWeekDailyDataset(month),
    };
  },
});

export type WeekDailyQueryKeys = inferQueryKeys<typeof weekDailyQueryKeys>;
