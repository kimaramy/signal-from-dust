import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { MonthUtils } from '@/lib/model';

import * as services from './services';

export const weekDailyQueryKeys = createQueryKeys('weekdaily', {
  detail(dataId: number) {
    return {
      queryKey: [dataId],
      queryFn: ({ signal }) =>
        services.fetchWeekDailyData({ dataId }, { signal }),
    };
  },
  list(monthKey: MonthUtils.Key) {
    const month = MonthUtils.schema.getValue(monthKey);
    return {
      queryKey: [{ month }],
      queryFn: ({ signal }) =>
        services.fetchWeekDailyDataset({ month }, { signal }),
    };
  },
});

export type WeekDailyQueryKeys = inferQueryKeys<typeof weekDailyQueryKeys>;
