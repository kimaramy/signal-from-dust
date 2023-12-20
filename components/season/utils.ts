import { seasonSchema } from '@/lib/model';
import { parseUrlParam, type UrlParams } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

export const parseSeasonKey = (params?: UrlParams) => {
  const [parsedKey] = parseUrlParam(
    params,
    QueryParamEnum.Season,
    seasonSchema.defaultKey
  );
  return seasonSchema.upperCaseKey(parsedKey);
};
