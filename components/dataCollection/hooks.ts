'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum, toLowerCase, toUpperCase } from '@/lib/utils';

import { dataCollectionSchema, type DataCollectionKey } from './schema';

export function useDataCollectionKey(): DataCollectionKey {
  const lowerCasedKeys = dataCollectionSchema.getAllKeys().map(toLowerCase);
  const lowerCasedDefaultKey = toLowerCase(dataCollectionSchema.defaultKey);
  const [lowerCasedKey] = useEnumQueryParam(
    QueryParamEnum.DataCollection,
    lowerCasedKeys,
    lowerCasedDefaultKey
  );
  return toUpperCase(lowerCasedKey);
}

export function useSetDataCollectionKey() {
  const setDataCollectionKey = useSetQueryParam(QueryParamEnum.DataCollection);
  return function (dataCollectionKey: DataCollectionKey) {
    const lowerCasedKey = toLowerCase(dataCollectionKey);
    setDataCollectionKey(lowerCasedKey);
  };
}
