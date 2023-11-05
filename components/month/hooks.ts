'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum, toLowerCase, toUpperCase } from '@/lib/utils';

import { monthSchema, type MonthKey } from './schema';

export function useMonthKey(): MonthKey {
  const lowerCasedKeys = monthSchema.getAllKeys().map(toLowerCase);
  const lowerCasedDefaultKey = toLowerCase(monthSchema.getDefaultKey());
  const [lowerCasedKey] = useEnumQueryParam(
    QueryParamEnum.Month,
    lowerCasedKeys,
    lowerCasedDefaultKey
  );
  return toUpperCase(lowerCasedKey);
}

export function useMonthValue() {
  const monthKey = useMonthKey();
  return monthSchema.getValue(monthKey);
}

export function useSetMonthKey() {
  const setMonthKey = useSetQueryParam(QueryParamEnum.Month);
  return function (monthKey: MonthKey) {
    const lowerCasedKey = toLowerCase(monthKey);
    setMonthKey(lowerCasedKey);
  };
}
