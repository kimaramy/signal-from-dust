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
  list(filters?: {}) {
    return {
      queryKey: [{ ...filters }],
      queryFn: () => services.fetchYearlyDataset(filters),
    };
  },
});

export type YearlyQueryKeys = inferQueryKeys<typeof yearlyQueryKeys>;
