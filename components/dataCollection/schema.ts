import type { TableKeys } from '@/domains';
import { upperFirst } from 'lodash-es';
import { z } from 'zod';

import {
  KeyValueSchema,
  stringUnionToArray,
  toLowerCase,
  toOrderedBy,
} from '@/lib/utils';
import { LocaleSchema } from '@/components/locale';

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

// z.enum 타입이 [string, ...string[]] 형식. 즉 무조건 하나의 요소가 보장되어야하는 NonEmptyArray 타입이므로 불가피하게 이렇게 할당함
const dataCollectionKeySchema = z.enum([
  dataCollectionKeys[0],
  ...dataCollectionKeys.slice(1),
]);

const dataCollectionKeyValueMap = new Map<
  DataCollectionKey,
  DataCollectionValue
>(
  dataCollectionKeys.map((dataCollectionKey) => [
    dataCollectionKey,
    toLowerCase(dataCollectionKey),
  ])
);

class DataCollectionSchema extends KeyValueSchema<
  DataCollectionKey,
  DataCollectionValue
> {
  constructor() {
    super(
      dataCollectionKeySchema,
      dataCollectionKeySchema.enum.DAILY,
      dataCollectionKeyValueMap
    );
  }
  display(
    dataCollectionKey: DataCollectionKey,
    locale = LocaleSchema.defaultLocale
  ) {
    const isKorean = LocaleSchema.isKorean(locale);
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
