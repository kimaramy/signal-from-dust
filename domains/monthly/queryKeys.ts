import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { SeasonUtils, YearUtils } from '@/lib/model';

import * as services from './services';

export const monthlyQueryKeys = createQueryKeys('monthly', {
  detail(dataId: number) {
    return {
      queryKey: [dataId],
      queryFn: () => services.fetchMonthlyData(dataId),
    };
  },
  list(yearKey: YearUtils.Key) {
    const year = YearUtils.schema.getValue(yearKey);
    return {
      queryKey: [{ year }],
      queryFn: () => services.fetchMonthlyDataset(year),
      contextQueries: {
        seasonally(seasonKey: SeasonUtils.Key) {
          const months = SeasonUtils.schema.getMonthRange(seasonKey);
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
