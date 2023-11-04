'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';
import { toLower, toUpper } from 'lodash-es';

import { QueryParamEnum } from '@/lib/utils';

import { dataCollectionSchema, type DataCollectionKey } from './schema';

export function useDataCollectionKey(): DataCollectionKey {
  const lowerCasedKeys = dataCollectionSchema
    .getAllKeys()
    .map((key) => toLower(key) as Lowercase<DataCollectionKey>);

  const lowerCasedDefaultKey = toLower(
    dataCollectionSchema.getDefaultKey()
  ) as Lowercase<DataCollectionKey>;

  const [lowerCasedKey] = useEnumQueryParam(
    QueryParamEnum.DataCollection,
    lowerCasedKeys,
    lowerCasedDefaultKey
  );

  return toUpper(lowerCasedKey) as DataCollectionKey;
}

// export function useDataCollectionKey(): DataCollectionKey {
//   const dataCollectionValue = useDataCollectionValue();
//   return dataCollectionSchema.getKeyByValue(dataCollectionValue);
// }

export function useSetDataCollectionKey() {
  const setDataCollectionKey = useSetQueryParam<Lowercase<DataCollectionKey>>(
    QueryParamEnum.DataCollection
  );
  return function (dataCollectionKey: DataCollectionKey) {
    const lowerCasedKey = toLower(
      dataCollectionKey
    ) as Lowercase<DataCollectionKey>;
    setDataCollectionKey(lowerCasedKey);
  };
}

// export function useSetDataCollectionKey() {
//   const setDataCollectionValue = useSetDataCollectionValue();
//   return function (dataCollectionKey: DataCollectionKey) {
//     const dataCollectionValue =
//       dataCollectionSchema.getValue(dataCollectionKey);
//     setDataCollectionValue(dataCollectionValue);
//   };
// }
