import { parseUrlParam, type UrlParams } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { yearSchema } from './schema';

export const parseYearKey = (params?: UrlParams) => {
  const [sluggedYearKey] = parseUrlParam(
    params,
    QueryParamEnum.Year,
    yearSchema.defaultKey
  );
  return yearSchema.getKeyBySlug(sluggedYearKey);
};
