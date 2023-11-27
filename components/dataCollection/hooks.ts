'use client';

import { useSearchParams } from 'next/navigation';
import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';

import { dataCollectionSchema, type DataCollectionKey } from './schema';

export function useDataCollectionKey(
  initialKey?: DataCollectionKey
): DataCollectionKey {
  const sluggedKeys = dataCollectionSchema.getAllSlugs();
  const defaultSluggedKey = dataCollectionSchema.getSlug(
    initialKey ?? dataCollectionSchema.defaultKey
  );
  const [sluggedKey] = useEnumQueryParam(
    QueryParamEnum.DataCollection,
    sluggedKeys,
    defaultSluggedKey
  );
  return dataCollectionSchema.getKeyBySlug(sluggedKey);
}

export function useSetDataCollectionKey() {
  const setDataCollectionKey = useSetQueryParam(
    useSearchParams(),
    QueryParamEnum.DataCollection
  );
  return function (dataCollectionKey: DataCollectionKey) {
    const sluggedKey = dataCollectionSchema.getSlug(dataCollectionKey);
    return setDataCollectionKey(sluggedKey);
  };
}
