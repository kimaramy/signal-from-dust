'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';
import { toLower, toUpper } from 'lodash-es';

import { QueryParamEnum } from '@/lib/utils';

import { yearSchema, type YearKey } from './schema';

export function useYearKey(): YearKey {
  const lowerCasedKeys = yearSchema
    .getAllKeys()
    .map((key) => toLower(key) as Lowercase<YearKey>);

  const lowerCasedDefaultKey = toLower(
    yearSchema.getDefaultKey()
  ) as Lowercase<YearKey>;

  const [lowerCasedKey] = useEnumQueryParam(
    QueryParamEnum.Year,
    lowerCasedKeys,
    lowerCasedDefaultKey
  );
  return toUpper(lowerCasedKey) as YearKey;
}

export function useYearValue() {
  const yearKey = useYearKey();
  return yearSchema.getValue(yearKey);
}

export function useSetYearKey() {
  const setYearKey = useSetQueryParam<Lowercase<YearKey>>(QueryParamEnum.Year);
  return function (yearKey: YearKey) {
    const lowerCasedKey = toLower(yearKey) as Lowercase<YearKey>;
    setYearKey(lowerCasedKey);
  };
}
