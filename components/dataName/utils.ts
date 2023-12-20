import { dataNameSchema } from '@/lib/model';
import { parseUrlParam, type UrlParams } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

export const parseDataNameKey = (params?: UrlParams) => {
  const [parsedKey] = parseUrlParam(
    params,
    QueryParamEnum.DataName,
    dataNameSchema.defaultKey
  );
  return dataNameSchema.upperCaseKey(parsedKey);
};
