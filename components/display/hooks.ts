'use client';

import { useSearchParams } from 'next/navigation';
import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';

import { displaySchema, type DisplayKey } from './schema';

export function useDisplayKey(initialKey?: DisplayKey): DisplayKey {
  const sluggedKeys = displaySchema.getAllSlugs();
  const defaultSluggedKey = displaySchema.getSlug(
    initialKey ?? displaySchema.defaultKey
  );
  const [sluggedKey] = useEnumQueryParam(
    QueryParamEnum.Display,
    sluggedKeys,
    defaultSluggedKey
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
