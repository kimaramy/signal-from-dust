import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { type MonthKey } from '@/components/month';

import * as services from './services';

export const weekDailyDataKeys = createQueryKeys('weekdaily', {
  detail: (dataId: number) => ({
    queryKey: [dataId],
    queryFn: () => services.fetchWeekDailyData(dataId),
  }),
  list: (monthKey: MonthKey) => ({
    queryKey: [{ monthKey }],
    queryFn: () => services.fetchWeekDailyDataList(monthKey),
  }),
});

export type WeekDailyDataKeys = inferQueryKeys<typeof weekDailyDataKeys>;
