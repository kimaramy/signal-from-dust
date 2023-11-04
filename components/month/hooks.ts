'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';
import { toLower, toUpper } from 'lodash-es';

import { QueryParamEnum } from '@/lib/utils';

import { monthSchema, type MonthKey } from './schema';

export function useMonthKey(): MonthKey {
  const lowerCasedKeys = monthSchema
    .getAllKeys()
    .map((key) => toLower(key) as Lowercase<MonthKey>);

  const lowerCasedDefaultKey = toLower(
    monthSchema.getDefaultKey()
  ) as Lowercase<MonthKey>;

  const [lowerCasedKey] = useEnumQueryParam(
    QueryParamEnum.Month,
    lowerCasedKeys,
    lowerCasedDefaultKey
  );

  return toUpper(lowerCasedKey) as MonthKey;
}

export function useMonthValue() {
  const monthKey = useMonthKey();
  return monthSchema.getValue(monthKey);
}

export function useSetMonthKey() {
  const setMonthKey = useSetQueryParam<Lowercase<MonthKey>>(
    QueryParamEnum.Month
  );
  return function (monthKey: MonthKey) {
    const lowerCasedKey = toLower(monthKey) as Lowercase<MonthKey>;
    setMonthKey(lowerCasedKey);
  };
}
