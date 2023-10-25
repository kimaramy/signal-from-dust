import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import type { Season } from '@/components/season';
import type { Year } from '@/components/year';

import * as services from './services';

export const monthlyDataKeys = createQueryKeys('monthly', {
  detail: (dataId: number) => ({
    queryKey: [dataId],
    queryFn: () => services.fetchMonthlyData(dataId),
  }),
  list: (year: Year) => ({
    queryKey: [{ year }],
    queryFn: () => services.fetchMonthlyDataList(year),
    contextQueries: {
      seasonal: (season: Season) => ({
        queryKey: [{ season }],
        queryFn: () => services.fetchMonthlyDataListBySeason(year, season),
      }),
    },
  }),
});

export type MonthlyDataKeys = inferQueryKeys<typeof monthlyDataKeys>;
