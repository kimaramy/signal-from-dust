import { parseUrlParam, type UrlParams } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { seasonSchema } from './schema';

export const parseSeasonKey = (params?: UrlParams) => {
  const [sluggedKey] = parseUrlParam(
    params,
    QueryParamEnum.Season,
    seasonSchema.defaultKey
  );
  return seasonSchema.getKeyBySlug(sluggedKey);
};
