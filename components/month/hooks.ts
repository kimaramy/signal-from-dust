'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';

import {
  defaultMonthKey,
  defaultMonthValue,
  getMonthKey,
  getMonthValue,
  Month,
  MonthKey,
  monthKeys,
  monthKeySchema,
} from './schema';

export function useMonthValue() {
  const [monthKey] = useEnumQueryParam(
    QueryParamEnum.Month,
    monthKeys.slice(),
    defaultMonthKey
  );
  return getMonthValue(monthKey);
}

export function useSetMonthValue() {
  const setMonthKey = useSetQueryParam<MonthKey>(QueryParamEnum.Month);
  return function (monthValue: Month) {
    const maybeMonthKey = getMonthKey(monthValue);
    monthKeySchema.parse(maybeMonthKey);
    setMonthKey(maybeMonthKey as MonthKey);
  };
}

export function useResetMonthValue() {
  const setMonthKey = useSetQueryParam<MonthKey>(QueryParamEnum.Month);
  return function () {
    const monthKey = getMonthKey(defaultMonthValue);
    setMonthKey(monthKey as MonthKey);
  };
}
