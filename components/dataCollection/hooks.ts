'use client';

import { useEnumUrlParam } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { dataCollectionSchema, type DataCollectionKey } from './schema';

export function useDataCollectionKey(
  initialKey?: DataCollectionKey
): DataCollectionKey {
  const sluggedKeys = dataCollectionSchema.getAllSlugs();
  const defaultSluggedKey = dataCollectionSchema.getSlug(
    initialKey ?? dataCollectionSchema.defaultKey
  );
  const [sluggedKey] = useEnumUrlParam(
    QueryParamEnum.DataCollection,
    defaultSluggedKey,
    { enums: sluggedKeys, part: 'path' }
  );
  return dataCollectionSchema.getKeyBySlug(sluggedKey);
}
