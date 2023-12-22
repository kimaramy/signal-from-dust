import { z } from 'zod';

import { stringUnionToArray, toLowerCase, toOrderedBy } from '@/lib/utils';

import type { TableKeys } from '../supabase';
import { MapSchema } from './base';
import { LocaleSchema } from './locale';

const collectionSchemaName = 'collection';

type CollectionSchemaName = typeof collectionSchemaName;

type CollectionKey = Uppercase<TableKeys> | 'SEASONALLY';

type CollectionValue = Lowercase<CollectionKey>;

const collectionKeys = Object.freeze(
  toOrderedBy(
    stringUnionToArray<CollectionKey>()(
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
const collectionKeySchema = z.enum([
  collectionKeys[0],
  ...collectionKeys.slice(1),
]);

const collectionMap = new Map<CollectionKey, CollectionValue>(
  collectionKeys.map((collectionKey) => [
    collectionKey,
    toLowerCase(collectionKey),
  ])
);

class CollectionSchema extends MapSchema<
  CollectionSchemaName,
  CollectionKey,
  CollectionValue
> {
  constructor() {
    super(
      collectionSchemaName,
      collectionMap,
      collectionKeySchema,
      collectionKeySchema.enum.DAILY
    );
  }
  display(collectionKey: CollectionKey, locale = LocaleSchema.defaultLocale) {
    const isKorean = LocaleSchema.isKorean(locale);
    switch (collectionKey) {
      case 'YEARLY':
        return isKorean ? '연도별' : 'Yearly';
      case 'SEASONALLY':
        return isKorean ? '계절별' : 'Seasonal';
      case 'MONTHLY':
        return isKorean ? '월별' : 'Monthly';
      case 'WEEKLY':
        return isKorean ? '주별' : 'Weekly';
      case 'WEEKDAILY':
        return isKorean ? '요일별' : 'Weekdaily';
      case 'DAILY':
        return isKorean ? '일별' : 'Daily';
      default:
        return this.parseKey(collectionKey) as never;
    }
  }
  getDataCount(collectionKey: CollectionKey) {
    switch (collectionKey) {
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
        return this.parseKey(collectionKey) as never;
    }
  }
}

const collectionSchema = new CollectionSchema();

export {
  collectionSchema,
  type CollectionSchemaName,
  type CollectionKey,
  type CollectionValue,
};
