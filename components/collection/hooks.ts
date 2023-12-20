'use client';

import { collectionSchema, type CollectionKey } from '@/lib/model';
import { useEnumUrlParam } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

export function useCollectionKey(initialKey?: CollectionKey): CollectionKey {
  const lowerCasedKeys = collectionSchema.mapKeys(
    collectionSchema.lowerCaseKey
  );
  const lowerCasedDefaultKey = collectionSchema.lowerCaseKey(
    initialKey ?? collectionSchema.defaultKey
  );
  const [lowerCasedKey] = useEnumUrlParam(
    QueryParamEnum.Collection,
    lowerCasedDefaultKey,
    { enums: lowerCasedKeys, part: 'path' }
  );
  return collectionSchema.upperCaseKey(lowerCasedKey);
}
