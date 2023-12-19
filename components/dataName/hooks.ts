'use client';

import { useSearchParams } from 'next/navigation';

import { useEnumUrlParam, useSetQueryParam } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { dataNameSchema, type DataNameKey } from './schema';

export function useDataNameKey(initialKey?: DataNameKey): DataNameKey {
  const lowerCasedKeys = dataNameSchema.mapKeys(dataNameSchema.lowerCaseKey);
  const lowerCasedDefaultKey = dataNameSchema.lowerCaseKey(
    initialKey ?? dataNameSchema.defaultKey
  );
  const [lowerCasedKey] = useEnumUrlParam(
    QueryParamEnum.DataName,
    lowerCasedDefaultKey,
    { enums: lowerCasedKeys, part: 'query' }
  );
  return dataNameSchema.upperCaseKey(lowerCasedKey);
}

export function useSetDataNameKey() {
  const setDataNameKey = useSetQueryParam(
    useSearchParams(),
    QueryParamEnum.DataName
  );
  return function (dataNameKey: DataNameKey) {
    const lowerCasedKey = dataNameSchema.lowerCaseKey(dataNameKey);
    return setDataNameKey(lowerCasedKey);
  };
}
