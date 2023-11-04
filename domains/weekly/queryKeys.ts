import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { type YearKey } from '@/components/year';

import * as services from './services';

export const weeklyDataKeys = createQueryKeys('weekly', {
  detail: (dataId: number) => ({
    queryKey: [dataId],
    queryFn: () => services.fetchWeeklyData(dataId),
  }),
  list: (yearKey: YearKey) => ({
    queryKey: [{ yearKey }],
    queryFn: () => services.fetchWeeklyDataList(yearKey),
  }),
});

export type WeeklyDataKeys = inferQueryKeys<typeof weeklyDataKeys>;
