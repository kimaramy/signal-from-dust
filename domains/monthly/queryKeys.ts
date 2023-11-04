import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { type SeasonKey } from '@/components/season';
import { type YearKey } from '@/components/year';

import * as services from './services';

export const monthlyQueryKeys = createQueryKeys('monthly', {
  detail: (dataId: number) => ({
    queryKey: [dataId],
    queryFn: () => services.fetchMonthlyData(dataId),
  }),
  list: (yearKey: YearKey) => ({
    queryKey: [{ yearKey }],
    queryFn: () => services.fetchMonthlyDataset(yearKey),
    contextQueries: {
      seasonal: (seasonKey: SeasonKey) => ({
        queryKey: [{ seasonKey }],
        queryFn: () => services.fetchMonthlyDatasetBySeason(yearKey, seasonKey),
      }),
    },
  }),
});

export type MonthlyQueryKeys = inferQueryKeys<typeof monthlyQueryKeys>;
