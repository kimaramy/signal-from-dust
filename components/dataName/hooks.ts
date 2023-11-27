'use client';

import { useSearchParams } from 'next/navigation';

import { useEnumQueryParam, useSetQueryParam } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { dataNameSchema, type DataNameKey } from './schema';

export function useDataNameKey(initialKey?: DataNameKey): DataNameKey {
  const sluggedKeys = dataNameSchema.getAllSlugs();
  const defaultSluggedKey = dataNameSchema.getSlug(
    initialKey ?? dataNameSchema.defaultKey
  );
  const [sluggedKey] = useEnumQueryParam(
    QueryParamEnum.DataName,
    sluggedKeys,
    defaultSluggedKey
  );
  return dataNameSchema.getKeyBySlug(sluggedKey);
}

export function useSetDataNameKey() {
  const setDataNameKey = useSetQueryParam(
    useSearchParams(),
    QueryParamEnum.DataName
  );
  return function (dataNameKey: DataNameKey) {
    const sluggedKey = dataNameSchema.getSlug(dataNameKey);
    return setDataNameKey(sluggedKey);
  };
}
