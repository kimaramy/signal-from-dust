import { parseUrlParam, type UrlParams } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { dataNameSchema } from './schema';

export const parseDataNameKey = (params?: UrlParams) => {
  const [parsedKey] = parseUrlParam(
    params,
    QueryParamEnum.DataName,
    dataNameSchema.defaultKey
  );
  return dataNameSchema.upperCaseKey(parsedKey);
};
