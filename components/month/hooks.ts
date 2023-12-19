'use client';

import { useSearchParams } from 'next/navigation';

import { useEnumUrlParam, useSetQueryParam } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { monthSchema, type MonthKey } from './schema';

export function useMonthKey(initialKey?: MonthKey): MonthKey {
  const lowerCasedKeys = monthSchema.mapKeys(monthSchema.lowerCaseKey);
  const lowerCasedDefaultKey = monthSchema.lowerCaseKey(
    initialKey ?? monthSchema.defaultKey
  );
  const [lowerCasedKey] = useEnumUrlParam(
    QueryParamEnum.Month,
    lowerCasedDefaultKey,
    { enums: lowerCasedKeys, part: 'query' }
  );
  return monthSchema.upperCaseKey(lowerCasedKey);
}

export function useMonthValue() {
  const monthKey = useMonthKey();
  return monthSchema.getValue(monthKey);
}

export function useSetMonthKey() {
  const setMonthKey = useSetQueryParam(useSearchParams(), QueryParamEnum.Month);
  return function (monthKey: MonthKey) {
    const lowerCasedKey = monthSchema.lowerCaseKey(monthKey);
    return setMonthKey(lowerCasedKey);
  };
}
