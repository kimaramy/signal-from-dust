import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { YearUtils } from '@/lib/model';

import * as services from './services';

export const weeklyQueryKeys = createQueryKeys('weekly', {
  detail(dataId: number) {
    return {
      queryKey: [dataId],
      queryFn: () => services.fetchWeeklyData(dataId),
    };
  },
  list(yearKey: YearUtils.Key) {
    const year = YearUtils.schema.getValue(yearKey);
    return {
      queryKey: [{ year }],
      queryFn: () => services.fetchWeeklyDataset(year),
    };
  },
});

export type WeeklyQueryKeys = inferQueryKeys<typeof weeklyQueryKeys>;
