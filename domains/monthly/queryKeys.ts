import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { type SeasonValue } from '@/components/season';
import type { Year } from '@/components/year';

import * as services from './services';

export const monthlyQueryKeys = createQueryKeys('monthly', {
  detail: (dataId: number) => ({
    queryKey: [dataId],
    queryFn: () => services.fetchMonthlyData(dataId),
  }),
  list: (yearValue: Year) => ({
    queryKey: [{ year: yearValue }],
    queryFn: () => services.fetchMonthlyDataset(yearValue),
    contextQueries: {
      seasonal: (seasonValue: SeasonValue) => ({
        queryKey: [{ season: seasonValue }],
        queryFn: () =>
          services.fetchMonthlyDatasetBySeason(yearValue, seasonValue),
      }),
    },
  }),
});

export type MonthlyQueryKeys = inferQueryKeys<typeof monthlyQueryKeys>;
