import type { QueryParams } from '@/lib/types';
import { pickQueryParam, QueryParamEnum, toUpperCase } from '@/lib/utils';

import { monthSchema, type MonthKey } from './schema';

export const pickMonthKey = (params?: QueryParams) => {
  const maybeMonthKey = toUpperCase(
    pickQueryParam(params, QueryParamEnum.Month, monthSchema.defaultKey)
  );
  monthSchema.parseKey(maybeMonthKey);
  return maybeMonthKey as MonthKey;
};
