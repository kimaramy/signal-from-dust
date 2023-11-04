'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';
import { toLower, toUpper } from 'lodash-es';

import { QueryParamEnum } from '@/lib/utils';

import { displaySchema, type DisplayKey } from './schema';

export function useDisplayKey(): DisplayKey {
  const lowerCasedKeys = displaySchema
    .getAllKeys()
    .map((key) => toLower(key) as Lowercase<DisplayKey>);

  const lowerCasedDefaultKey = toLower(
    displaySchema.getDefaultKey()
  ) as Lowercase<DisplayKey>;

  const [lowerCasedKey] = useEnumQueryParam(
    QueryParamEnum.Display,
    lowerCasedKeys,
    lowerCasedDefaultKey
  );

  return toUpper(lowerCasedKey) as DisplayKey;
}

export function useSetDisplayKey() {
  const setDisplayKey = useSetQueryParam<Lowercase<DisplayKey>>(
    QueryParamEnum.Display
  );
  return function (displayKey: DisplayKey) {
    const lowerCasedKey = toLower(displayKey) as Lowercase<DisplayKey>;
    setDisplayKey(lowerCasedKey);
  };
}
