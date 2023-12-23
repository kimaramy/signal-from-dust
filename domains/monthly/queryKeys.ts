import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { AppSeason, AppYear } from '@/lib/model';

import * as services from './services';

export const monthlyQueryKeys = createQueryKeys('monthly', {
  detail(dataId: number) {
    return {
      queryKey: [dataId],
      queryFn: () => services.fetchMonthlyData(dataId),
    };
  },
  list(yearKey: AppYear.Key) {
    const year = AppYear.schema.getValue(yearKey);
    return {
      queryKey: [{ year }],
      queryFn: () => services.fetchMonthlyDataset(year),
      contextQueries: {
        seasonally(seasonKey: AppSeason.Key) {
          const months = AppSeason.schema.getMonthRange(seasonKey);
          return {
            queryKey: [{ months }],
            queryFn: () => services.fetchMonthlyDatasetBySeason(year, months),
          };
        },
      },
    };
  },
});

export type MonthlyQueryKeys = inferQueryKeys<typeof monthlyQueryKeys>;
