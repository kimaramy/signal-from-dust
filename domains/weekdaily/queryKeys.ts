import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { monthSchema, type MonthKey } from '@/lib/model';

import * as services from './services';

export const weekDailyQueryKeys = createQueryKeys('weekdaily', {
  detail(dataId: number) {
    return {
      queryKey: [dataId],
      queryFn: () => services.fetchWeekDailyData(dataId),
    };
  },
  list(monthKey: MonthKey) {
    const month = monthSchema.getValue(monthKey);
    return {
      queryKey: [{ month }],
      queryFn: () => services.fetchWeekDailyDataset(month),
    };
  },
});

export type WeekDailyQueryKeys = inferQueryKeys<typeof weekDailyQueryKeys>;
