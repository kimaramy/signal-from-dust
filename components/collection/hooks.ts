'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';

import {
  Collection,
  collections,
  collectionSchema,
  defaultCollection,
} from './schema';

export function useCollectionValue() {
  const [collection] = useEnumQueryParam(
    QueryParamEnum.Collection,
    collections.slice(),
    defaultCollection
  );
  return collection;
}

export function useSetCollectionValue() {
  const setCollection = useSetQueryParam<Collection>(QueryParamEnum.Collection);
  return function (collection: Collection) {
    collectionSchema.parse(collection);
    setCollection(collection);
  };
}
