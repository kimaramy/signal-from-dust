'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum, toLowerCase, toUpperCase } from '@/lib/utils';

import { yearSchema, type YearKey } from './schema';

export function useYearKey(): YearKey {
  const lowerCasedKeys = yearSchema.getAllKeys().map(toLowerCase);
  const lowerCasedDefaultKey = toLowerCase(yearSchema.defaultKey);
  const [lowerCasedKey] = useEnumQueryParam(
    QueryParamEnum.Year,
    lowerCasedKeys,
    lowerCasedDefaultKey
  );
  return toUpperCase(lowerCasedKey);
}

export function useYearValue() {
  const yearKey = useYearKey();
  return yearSchema.getValue(yearKey);
}

export function useSetYearKey() {
  const setYearKey = useSetQueryParam(QueryParamEnum.Year);
  return function (yearKey: YearKey) {
    const lowerCasedKey = toLowerCase(yearKey);
    setYearKey(lowerCasedKey);
  };
}
