import { z } from 'zod';

import { stringUnionToArray, toOrderedBy } from '@/lib/utils';

import { Model } from '../supabase';
import { MapSchema, type MapValue } from './base';
import { LocaleSchema } from './locale';

const collectionSchemaName = 'collection';

type CollectionSchemaName = typeof collectionSchemaName;

type CollectionKey = Uppercase<Model.TableKeys> | 'SEASONALLY';

type CollectionValue = MapValue<CollectionKey> & {
  dataCount: number;
  pattern: {
    i18n: MapValue['i18n'];
  };
};

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

const collectionValues: ReadonlyArray<CollectionValue> = [
  {
    name: 'YEARLY',
    dataCount: 8,
    order: 0,
    i18n: {
      en: 'Yearly',
      ko: '연도별',
    },
    pattern: {
      i18n: {
        en: 'Every year',
        ko: '매년',
      },
    },
  },
  {
    name: 'MONTHLY',
    dataCount: 12,
    order: 1,
    i18n: {
      en: 'Monthly',
      ko: '월별',
    },
    pattern: {
      i18n: {
        en: 'Every month',
        ko: '매달',
      },
    },
  },
  {
    name: 'SEASONALLY',
    dataCount: 3,
    order: 2,
    i18n: {
      en: 'Seasonal',
      ko: '계절별',
    },
    pattern: {
      i18n: {
        en: 'Every season',
        ko: '사계절',
      },
    },
  },
  {
    name: 'WEEKLY',
    dataCount: 53,
    order: 3,
    i18n: {
      en: 'Weekly',
      ko: '주별',
    },
    pattern: {
      i18n: {
        en: 'Every week',
        ko: '매주',
      },
    },
  },
  {
    name: 'WEEKDAILY',
    dataCount: 7,
    order: 4,
    i18n: {
      en: 'Weekdaily',
      ko: '요일별',
    },
    pattern: {
      i18n: {
        en: 'Every weekday',
        ko: '요일마다',
      },
    },
  },
  {
    name: 'DAILY',
    dataCount: 31,
    order: 5,
    i18n: {
      en: 'Daily',
      ko: '일별',
    },
    pattern: {
      i18n: {
        en: 'Everyday',
        ko: '매일',
      },
    },
  },
];

const collectionMap = new Map<CollectionKey, CollectionValue>(
  collectionKeys.map((collectionKey) => [
    collectionKey,
    collectionValues.find(
      (collectionValue) => collectionValue.name === collectionKey
    )!,
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
  display(
    collectionKey: CollectionKey,
    locale = LocaleSchema.defaultLocale,
    type: 'default' | 'patterned' = 'default'
  ) {
    if (type === 'patterned') {
      return this.getValue(collectionKey)['pattern']['i18n'][locale];
    }
    return this.getValue(collectionKey)['i18n'][locale];
  }
  getDataCount(collectionKey: CollectionKey) {
    return this.getValue(collectionKey).dataCount;
  }
}

const collectionSchema = new CollectionSchema();

export namespace CollectionUtils {
  export type Key = CollectionKey;
  export type Value = CollectionValue;
  export type SchemaName = CollectionSchemaName;
  export const schema = collectionSchema;
}
