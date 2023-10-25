'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';

import {
  getYearKey,
  getYearValue,
  Year,
  YearKey,
  yearKeyMap,
  yearKeySet,
} from './schema';

export function useYearValue() {
  const [year] = useEnumQueryParam(
    QueryParamEnum.Year,
    [...yearKeySet],
    yearKeyMap.Default
  );
  return getYearValue(year);
}

export function useSetYearValue() {
  const setYearKey = useSetQueryParam<YearKey>(QueryParamEnum.Year);
  return (value: Year) => setYearKey(getYearKey(value));
}

export function useResetYearValue() {
  const setYearKey = useSetQueryParam<YearKey>(QueryParamEnum.Year);
  return () => {
    const defaultValue = Year[yearKeyMap.Default];
    setYearKey(getYearKey(defaultValue));
  };
}
