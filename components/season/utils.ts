import type { QueryParams } from '@/lib/types';
import { pickQueryParam, QueryParamEnum, toUpperCase } from '@/lib/utils';

import { seasonSchema, type SeasonKey } from './schema';

export const pickSeasonKey = (params?: QueryParams) => {
  const maybeSeasonKey = toUpperCase(
    pickQueryParam(params, QueryParamEnum.Season, seasonSchema.defaultKey)
  );
  seasonSchema.parseKey(maybeSeasonKey);
  return maybeSeasonKey as SeasonKey;
};
