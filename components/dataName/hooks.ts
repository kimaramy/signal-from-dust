'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum, toLowerCase, toUpperCase } from '@/lib/utils';

import { dataNameSchema, type DataNameKey } from './schema';

export function useDataNameKey(): DataNameKey {
  const lowerCasedKeys = dataNameSchema.getAllKeys().map(toLowerCase);
  const lowerCasedDefaultKey = toLowerCase(dataNameSchema.getDefaultKey());
  const [lowerCasedKey] = useEnumQueryParam(
    QueryParamEnum.DataName,
    lowerCasedKeys,
    lowerCasedDefaultKey
  );
  return toUpperCase(lowerCasedKey);
}

export function useSetDataNameKey() {
  const setDataNameKey = useSetQueryParam(QueryParamEnum.DataName);
  return function (dataNameKey: DataNameKey) {
    const lowerCasedKey = toLowerCase(dataNameKey);
    setDataNameKey(lowerCasedKey);
  };
}
