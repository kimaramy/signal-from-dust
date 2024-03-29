import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import * as services from './services';

export const yearlyQueryKeys = createQueryKeys('yearly', {
  detail(dataId: number) {
    return {
      queryKey: [dataId],
      queryFn: ({ signal }) => services.fetchYearlyData({ dataId }, { signal }),
    };
  },
  list(params = {}) {
    return {
      queryKey: [{ ...params }],
      queryFn: ({ signal }) => services.fetchYearlyDataset(null, { signal }),
    };
  },
  distinctYearList(params = {}) {
    return {
      queryKey: [{ ...params }],
      queryFn: ({ signal }) =>
        services.fetchDistinctYearDataset(null, { signal }),
    };
  },
});

export type YearlyQueryKeys = inferQueryKeys<typeof yearlyQueryKeys>;
