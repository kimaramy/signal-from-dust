import { yearSchema } from '@/lib/model';
import { parseUrlParam, type UrlParams } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

export const parseYearKey = (params?: UrlParams) => {
  const [parsedKey] = parseUrlParam(
    params,
    QueryParamEnum.Year,
    yearSchema.defaultKey
  );
  return yearSchema.upperCaseKey(parsedKey);
};
