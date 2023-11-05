import type { TableKeys } from '@/domains';
import { upperFirst } from 'lodash-es';
import { z } from 'zod';

import { stringUnionToArray } from '@/lib/ts-utils';
import {
  toLowerCase,
  toOrderedBy,
  toUpperCase,
  type QuerySchema,
} from '@/lib/utils';

type DataCollectionKey = Uppercase<TableKeys> | 'SEASONALLY';

type DataCollectionValue = Lowercase<DataCollectionKey>;

const dataCollectionKeys = Object.freeze(
  toOrderedBy(
    stringUnionToArray<DataCollectionKey>()(
      'YEARLY',
      'SEASONALLY',
      'MONTHLY',
      'WEEKLY',
      'WEEKDAILY',
      'DAILY'
    ),
    ['YEARLY', 'SEASONALLY', 'MONTHLY', 'WEEKLY', 'WEEKDAILY', 'DAILY']
  )
);

const dataCollectionKeySchema = z.enum([
  dataCollectionKeys[0], // z.enum 타이핑이 [string, ...string[]] 형식으로 되어있는 이슈로 인해 불가피하게 이렇게 할당함
  ...dataCollectionKeys.slice(1),
]);

type DataCollectionKeySchema = typeof dataCollectionKeySchema;

type DataCollectionDict = {
  name: DataCollectionKey;
  displayName: string;
  value: DataCollectionValue;
};

class DataCollectionSchema
  implements
    QuerySchema<DataCollectionKey, DataCollectionValue, DataCollectionDict>
{
  private readonly keySchema: DataCollectionKeySchema;
  readonly keys: DataCollectionKeySchema['Values'];

  constructor() {
    this.keySchema = dataCollectionKeySchema;
    this.keys = dataCollectionKeySchema.Values;
  }
  getDefaultKey() {
    return this.keySchema.Values.YEARLY;
  }
  getDefaultValue() {
    return this.getValue(this.getDefaultKey());
  }
  getAllKeys() {
    return Object.values(this.keySchema.Values);
  }
  getAllValues() {
    return this.getAllKeys().map((key) => this.getValue(key));
  }
  getKeyByValue(dataCollectionValue: DataCollectionValue) {
    return toUpperCase(dataCollectionValue);
  }
  getValue(dataCollectionKey: DataCollectionKey) {
    return toLowerCase(dataCollectionKey);
  }
  parseKey(maybeDataCollectionKey: unknown) {
    this.keySchema.parse(maybeDataCollectionKey);
  }
  safeParseKey(maybeDataCollectionKey: unknown) {
    return this.keySchema.safeParse(maybeDataCollectionKey).success;
  }
  refineKey(dataCollectionKeyLike: string) {
    const upperCasedKey = toUpperCase(dataCollectionKeyLike);
    this.parseKey(upperCasedKey);
    return upperCasedKey as DataCollectionKey;
  }
  getKeyDict(locale?: string) {
    return this.getAllKeys().reduce(
      (keyDict, key) => {
        keyDict[key] = {
          name: key,
          displayName: this.display(key, locale),
          value: this.getValue(key),
        };
        return keyDict;
      },
      {} as Record<DataCollectionKey, DataCollectionDict>
    );
  }
  display(dataCollectionKey: DataCollectionKey, locale = 'ko-KR') {
    const isKorean = locale === 'ko-KR';
    switch (dataCollectionKey) {
      case 'YEARLY':
        return isKorean ? '연도별' : upperFirst(dataCollectionKey);
      case 'SEASONALLY':
        return isKorean ? '계절별' : upperFirst(dataCollectionKey);
      case 'MONTHLY':
        return isKorean ? '월별' : upperFirst(dataCollectionKey);
      case 'WEEKLY':
        return isKorean ? '주별' : upperFirst(dataCollectionKey);
      case 'WEEKDAILY':
        return isKorean ? '요일별' : upperFirst(dataCollectionKey);
      case 'DAILY':
        return isKorean ? '일별' : upperFirst(dataCollectionKey);
      default:
        return this.parseKey(dataCollectionKey) as never;
    }
  }
  getDataCount(dataCollectionKey: DataCollectionKey) {
    switch (dataCollectionKey) {
      case 'YEARLY':
        return 8;
      case 'SEASONALLY':
        return 3;
      case 'MONTHLY':
        return 12;
      case 'WEEKLY':
        return 53;
      case 'WEEKDAILY':
        return 7;
      case 'DAILY':
        return 31;
      default:
        return this.parseKey(dataCollectionKey) as never;
    }
  }
}

const dataCollectionSchema = new DataCollectionSchema();

export {
  dataCollectionSchema,
  type DataCollectionKey,
  type DataCollectionValue,
};
