'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum, toLowerCase, toUpperCase } from '@/lib/utils';

import { displaySchema, type DisplayKey } from './schema';

export function useDisplayKey(): DisplayKey {
  const lowerCasedKeys = displaySchema.getAllKeys().map(toLowerCase);
  const lowerCasedDefaultKey = toLowerCase(displaySchema.defaultKey);
  const [lowerCasedKey] = useEnumQueryParam(
    QueryParamEnum.Display,
    lowerCasedKeys,
    lowerCasedDefaultKey
  );
  return toUpperCase(lowerCasedKey);
}

export function useSetDisplayKey() {
  const setDisplayKey = useSetQueryParam(QueryParamEnum.Display);
  return function (displayKey: DisplayKey) {
    const lowerCasedKey = toLowerCase(displayKey);
    setDisplayKey(lowerCasedKey);
  };
}
