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
      queryFn: ({ signal }) => services.fetchMonthlyData(dataId, { signal }),
    };
  },
  list(yearKey: YearUtils.Key) {
    const year = YearUtils.schema.getValue(yearKey);
    return {
      queryKey: [{ year }],
      queryFn: ({ signal }) => services.fetchMonthlyDataset(year, { signal }),
      contextQueries: {
        seasonally(seasonKey: SeasonUtils.Key) {
          const monthRange = SeasonUtils.schema.getMonthRange(seasonKey);
          return {
            queryKey: [{ monthRange }],
            queryFn: ({ signal }) =>
              services.fetchMonthlyDatasetBySeason(
                {
                  year,
                  monthRange,
                  seasonKey,
                },
                {
                  signal,
                }
              ),
          };
        },
      },
    };
  },
});

export type MonthlyQueryKeys = inferQueryKeys<typeof monthlyQueryKeys>;
