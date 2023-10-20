import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import * as services from './services';

export const yearlyDataKeys = createQueryKeys('yearly', {
  detail: (dataId: number) => ({
    queryKey: [dataId],
    queryFn: () => services.fetchYearlyData(dataId),
  }),
  list: (filters?: {}) => ({
    queryKey: [{ ...filters }],
    queryFn: () => services.fetchYearlyDataList(filters),
  }),
});

export type YearlyDataKeys = inferQueryKeys<typeof yearlyDataKeys>;
