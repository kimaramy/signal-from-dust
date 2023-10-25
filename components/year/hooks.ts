'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';

import {
  defaultYearKey,
  defaultYearValue,
  getYearKey,
  getYearValue,
  Year,
  YearKey,
  yearKeys,
  yearKeySchema,
} from './schema';

export function useYearValue() {
  const [yearKey] = useEnumQueryParam(
    QueryParamEnum.Year,
    yearKeys.slice(),
    defaultYearKey
  );
  return getYearValue(yearKey);
}

export function useSetYearValue() {
  const setYearKey = useSetQueryParam<YearKey>(QueryParamEnum.Year);
  return function (yearValue: Year) {
    const maybeYearKey = getYearKey(yearValue);
    yearKeySchema.parse(maybeYearKey);
    setYearKey(maybeYearKey as YearKey);
  };
}

export function useResetYearValue() {
  const setYearKey = useSetQueryParam<YearKey>(QueryParamEnum.Year);
  return function () {
    const yearKey = getYearKey(defaultYearValue);
    setYearKey(yearKey as YearKey);
  };
}
