import {
  pickQueryParam,
  QueryParamEnum,
  toUpperCase,
  type QueryParams,
} from '@/lib/utils';

import { dataCollectionSchema, type DataCollectionKey } from './schema';

export const pickDataCollectionKey = (params?: QueryParams) => {
  const maybeDataCollectionKey = toUpperCase(
    pickQueryParam(
      params,
      QueryParamEnum.DataCollection,
      dataCollectionSchema.defaultKey
    )
  );
  dataCollectionSchema.parseKey(maybeDataCollectionKey);
  return maybeDataCollectionKey as DataCollectionKey;
};
