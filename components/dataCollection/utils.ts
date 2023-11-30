import { parseUrlParam, type UrlParams } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { dataCollectionSchema } from './schema';

export const parseDataCollectionKey = (params?: UrlParams) => {
  const [sluggedKey] = parseUrlParam(
    params,
    QueryParamEnum.DataCollection,
    dataCollectionSchema.defaultKey
  );
  return dataCollectionSchema.getKeyBySlug(sluggedKey);
};
