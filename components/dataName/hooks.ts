'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';
import { toLower, toUpper } from 'lodash-es';

import { QueryParamEnum } from '@/lib/utils';

import { dataNameSchema, type DataNameKey } from './schema';

export function useDataNameKey(): DataNameKey {
  const lowerCasedKeys = dataNameSchema
    .getAllKeys()
    .map((key) => toLower(key) as Lowercase<DataNameKey>);

  const lowerCasedDefaultKey = toLower(
    dataNameSchema.getDefaultKey()
  ) as Lowercase<DataNameKey>;

  const [lowerCasedKey] = useEnumQueryParam(
    QueryParamEnum.DataName,
    lowerCasedKeys,
    lowerCasedDefaultKey
  );

  return toUpper(lowerCasedKey) as DataNameKey;
}

export function useSetDataNameKey() {
  const setDataNameKey = useSetQueryParam<Lowercase<DataNameKey>>(
    QueryParamEnum.DataName
  );
  return function (dataNameKey: DataNameKey) {
    const lowerCasedKey = toLower(dataNameKey) as Lowercase<DataNameKey>;
    setDataNameKey(lowerCasedKey);
  };
}
