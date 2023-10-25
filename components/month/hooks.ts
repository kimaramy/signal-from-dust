'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';

import {
  getMonthKey,
  getMonthValue,
  Month,
  MonthKey,
  monthKeyMap,
  monthKeySet,
} from './schema';

export function useMonthValue() {
  const [month] = useEnumQueryParam(
    QueryParamEnum.Month,
    [...monthKeySet],
    monthKeyMap.Default
  );
  return getMonthValue(month);
}

export function useSetMonthValue() {
  const setMonthKey = useSetQueryParam<MonthKey>(QueryParamEnum.Month);
  return (value: Month) => setMonthKey(getMonthKey(value));
}

export function useResetMonthValue() {
  const setMonthKey = useSetQueryParam<MonthKey>(QueryParamEnum.Month);
  return () => {
    const defaultValue = Month[monthKeyMap.Default];
    setMonthKey(getMonthKey(defaultValue));
  };
}
