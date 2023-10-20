import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import * as services from './services';

export const weeklyDataKeys = createQueryKeys('weekly', {
  detail: (dataId: number) => ({
    queryKey: [dataId],
    queryFn: () => services.fetchWeeklyData(dataId),
  }),
  list: (year: number) => ({
    queryKey: [{ year }],
    queryFn: () => services.fetchWeeklyDataList(year),
  }),
});

export type WeeklyDataKeys = inferQueryKeys<typeof weeklyDataKeys>;
