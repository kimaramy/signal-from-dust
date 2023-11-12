import {
  pickQueryParam,
  QueryParamEnum,
  toUpperCase,
  type QueryParams,
} from '@/lib/utils';

import { yearSchema, type YearKey } from './schema';

export const pickYearKey = (params?: QueryParams) => {
  const maybeYearKey = toUpperCase(
    pickQueryParam(params, QueryParamEnum.Year, yearSchema.defaultKey)
  );
  yearSchema.parseKey(maybeYearKey);
  return maybeYearKey as YearKey;
};
