import { collectionSchema } from '@/lib/model';
import { parseUrlParam, type UrlParams } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

export const parseCollectionKey = (params?: UrlParams) => {
  const [parsedKey] = parseUrlParam(
    params,
    QueryParamEnum.Collection,
    collectionSchema.defaultKey
  );
  return collectionSchema.upperCaseKey(parsedKey);
};
