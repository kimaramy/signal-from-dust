import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import * as services from './services';

export const yearlyQueryKeys = createQueryKeys('yearly', {
  detail(dataId: number) {
    return {
      queryKey: [dataId],
      queryFn: () => services.fetchYearlyData(dataId),
    };
  },
  list(params = {}) {
    return {
      queryKey: [{ ...params }],
      queryFn: () => services.fetchYearlyDataset(params),
    };
  },
  distinctYearList(params = {}) {
    return {
      queryKey: [{ ...params }],
      queryFn: () => services.fetchDistinctYearDataset(),
    };
  },
});

export type YearlyQueryKeys = inferQueryKeys<typeof yearlyQueryKeys>;
