import { parseUrlParam, type UrlParams } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { collectionSchema } from './schema';

export const parseCollectionKey = (params?: UrlParams) => {
  const [parsedKey] = parseUrlParam(
    params,
    QueryParamEnum.Collection,
    collectionSchema.defaultKey
  );
  return collectionSchema.upperCaseKey(parsedKey);
};
