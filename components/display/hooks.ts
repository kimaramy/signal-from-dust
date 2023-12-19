'use client';

import { useSearchParams } from 'next/navigation';

import { useEnumUrlParam, useSetQueryParam } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { displaySchema, type DisplayKey } from './schema';

export function useDisplayKey(initialKey?: DisplayKey): DisplayKey {
  const lowerCasedKeys = displaySchema.mapKeys(displaySchema.lowerCaseKey);
  const lowerCasedDefaultKey = displaySchema.lowerCaseKey(
    initialKey ?? displaySchema.defaultKey
  );
  const [lowerCasedKey] = useEnumUrlParam(
    QueryParamEnum.Display,
    lowerCasedDefaultKey,
    { enums: lowerCasedKeys, part: 'query' }
  );
  return displaySchema.upperCaseKey(lowerCasedKey);
}

export function useSetDisplayKey() {
  const setDisplayKey = useSetQueryParam(
    useSearchParams(),
    QueryParamEnum.Display
  );
  return function (displayKey: DisplayKey) {
    const lowerCasedKey = displaySchema.lowerCaseKey(displayKey);
    return setDisplayKey(lowerCasedKey);
  };
}
