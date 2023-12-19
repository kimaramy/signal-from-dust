import { parseUrlParam, type UrlParams } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { seasonSchema } from './schema';

export const parseSeasonKey = (params?: UrlParams) => {
  const [parsedKey] = parseUrlParam(
    params,
    QueryParamEnum.Season,
    seasonSchema.defaultKey
  );
  return seasonSchema.upperCaseKey(parsedKey);
};
