import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { seasonSchema, type SeasonKey } from '@/components/season';
import { yearSchema, type YearKey } from '@/components/year';

import * as services from './services';

export const monthlyQueryKeys = createQueryKeys('monthly', {
  detail(dataId: number) {
    return {
      queryKey: [dataId],
      queryFn: () => services.fetchMonthlyData(dataId),
    };
  },
  list(yearKey: YearKey) {
    const year = yearSchema.getValue(yearKey);
    return {
      queryKey: [{ year }],
      queryFn: () => services.fetchMonthlyDataset(year),
      contextQueries: {
        seasonally(seasonKey: SeasonKey) {
          const months = seasonSchema.getMonthRange(seasonKey);
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
