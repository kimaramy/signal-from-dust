import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { yearSchema, type YearKey } from '@/lib/model';

import * as services from './services';

export const weeklyQueryKeys = createQueryKeys('weekly', {
  detail(dataId: number) {
    return {
      queryKey: [dataId],
      queryFn: () => services.fetchWeeklyData(dataId),
    };
  },
  list(yearKey: YearKey) {
    const year = yearSchema.getValue(yearKey);
    return {
      queryKey: [{ year }],
      queryFn: () => services.fetchWeeklyDataset(year),
    };
  },
});

export type WeeklyQueryKeys = inferQueryKeys<typeof weeklyQueryKeys>;
