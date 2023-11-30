'use client';

import { useSearchParams } from 'next/navigation';

import { useEnumUrlParam, useSetQueryParam } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { displaySchema, type DisplayKey } from './schema';

export function useDisplayKey(initialKey?: DisplayKey): DisplayKey {
  const sluggedKeys = displaySchema.getAllSlugs();
  const defaultSluggedKey = displaySchema.getSlug(
    initialKey ?? displaySchema.defaultKey
  );
  const [sluggedKey] = useEnumUrlParam(
    QueryParamEnum.Display,
    defaultSluggedKey,
    { enums: sluggedKeys, part: 'query' }
  );
  return displaySchema.getKeyBySlug(sluggedKey);
}

export function useSetDisplayKey() {
  const setDisplayKey = useSetQueryParam(
    useSearchParams(),
    QueryParamEnum.Display
  );
  return function (displayKey: DisplayKey) {
    const sluggedKey = displaySchema.getSlug(displayKey);
    return setDisplayKey(sluggedKey);
  };
}
