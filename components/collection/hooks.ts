'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';

import { Collection, collectionMap, collectionSet } from './schema';

export function useCollectionValue() {
  const [collection] = useEnumQueryParam(
    QueryParamEnum.Collection,
    [...collectionSet],
    collectionMap.default
  );
  return collection;
}

export function useSetCollectionValue() {
  return useSetQueryParam<Collection>(QueryParamEnum.Collection);
}
