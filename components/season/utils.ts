import {
  pickQueryParam,
  QueryParamEnum,
  toUpperCase,
  type QueryParams,
} from '@/lib/utils';

import { seasonSchema, type SeasonKey } from './schema';

export const pickSeasonKey = (params?: QueryParams) => {
  const maybeSeasonKey = toUpperCase(
    pickQueryParam(params, QueryParamEnum.Season, seasonSchema.defaultKey)
  );
  seasonSchema.parseKey(maybeSeasonKey);
  return maybeSeasonKey as SeasonKey;
};
