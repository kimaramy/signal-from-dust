import { z } from 'zod';

import { stringUnionToArray, toOrderedBy } from '@/lib/utils';

import { Model } from '../supabase';
import {
  CustomValueMapSchema,
  type CustomValueTemplate,
  type I18n,
} from './base';
import { LocaleSchema } from './locale';

const collectionSchemaName = 'collection';

type CollectionSchemaName = typeof collectionSchemaName;

type CollectionKey = Uppercase<Model.TableKeys> | 'SEASONALLY' | 'REALTIME';

type CollectionValue = CustomValueTemplate<CollectionKey> & {
  dataCount: number;
  disabled: boolean;
  pattern?: {
    i18n: I18n;
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
      'DAILY',
      'REALTIME'
    ),
    [
      'YEARLY',
      'SEASONALLY',
      'MONTHLY',
      'WEEKLY',
      'WEEKDAILY',
      'DAILY',
      'REALTIME',
    ]
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
    order: 0,
    dataCount: 8,
    disabled: false,
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
    order: 1,
    dataCount: 12,
    disabled: false,
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
    order: 2,
    dataCount: 3,
    disabled: false,
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
    order: 3,
    dataCount: 53,
    disabled: false,
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
    order: 4,
    dataCount: 7,
    disabled: false,
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
    order: 5,
    dataCount: 31,
    disabled: false,
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
  {
    name: 'REALTIME',
    order: 6,
    dataCount: 1,
    disabled: true,
    i18n: {
      en: 'Realtime',
      ko: '실시간',
    },
    pattern: {
      i18n: {
        en: 'Now',
        ko: '현재',
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

class CollectionSchema extends CustomValueMapSchema<
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
      return this.getValue(collectionKey).pattern?.i18n[locale] ?? 'NULL';
    }
    return this.getValue(collectionKey).i18n[locale];
  }
  getDataCount(collectionKey: CollectionKey) {
    return this.getValue(collectionKey).dataCount;
  }
  checkDisabled(collectionKey: CollectionKey) {
    return this.getValue(collectionKey).disabled;
  }
}

const collectionSchema = new CollectionSchema();

export namespace CollectionUtils {
  export type Key = CollectionKey;
  export type Value = CollectionValue;
  export type SchemaName = CollectionSchemaName;
  export const schema = collectionSchema;
}
