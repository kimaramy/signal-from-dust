import { parseUrlParam, type UrlParams } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { monthSchema } from './schema';

export const parseMonthKey = (params?: UrlParams) => {
  const [sluggedKey] = parseUrlParam(
    params,
    QueryParamEnum.Month,
    monthSchema.defaultKey
  );
  return monthSchema.getKeyBySlug(sluggedKey);
};
