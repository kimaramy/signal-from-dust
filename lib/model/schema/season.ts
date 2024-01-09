import { z } from 'zod';

import { MapSchema, type MapValue } from './base';
import { LocaleSchema } from './locale';
import { MonthUtils } from './month';

const seasonSchemaName = 'season';

const seasonKeys = ['ALL', 'SPRING', 'SUMMER', 'FALL', 'WINTER'] as const;

const seasonKeySchema = z.enum(seasonKeys);

type SeasonSchemaName = typeof seasonSchemaName;

type SeasonKey = z.infer<typeof seasonKeySchema>;

type SeasonValue = MapValue<SeasonKey> & {
  monthRange: MonthUtils.Value[];
};

const seasonValues: ReadonlyArray<SeasonValue> = [
  {
    name: 'ALL',
    monthRange: new Array(12).fill(0).map((_, i) => i + 1),
    order: 0,
    i18n: {
      en: 'Every season',
      ko: '사계절',
    },
  },
  {
    name: 'SPRING',
    monthRange: [3, 4, 5],
    order: 1,
    i18n: {
      en: 'Spring',
      ko: '봄',
    },
  },
  {
    name: 'SUMMER',
    monthRange: [6, 7, 8],
    order: 2,
    i18n: {
      en: 'Summer',
      ko: '여름',
    },
  },
  {
    name: 'FALL',
    monthRange: [9, 10, 11],
    order: 3,
    i18n: {
      en: 'Fall',
      ko: '가을',
    },
  },
  {
    name: 'WINTER',
    monthRange: [1, 2, 12],
    order: 4,
    i18n: {
      en: 'Winter',
      ko: '겨울',
    },
  },
];

const seasonMap = new Map<SeasonKey, SeasonValue>(
  seasonKeys.map((seasonKey) => [
    seasonKey,
    seasonValues.find((seasonValue) => seasonValue.name === seasonKey)!,
  ])
);

class SeasonSchema extends MapSchema<SeasonSchemaName, SeasonKey, SeasonValue> {
  constructor() {
    super(
      seasonSchemaName,
      seasonMap,
      seasonKeySchema,
      seasonKeySchema.enum.ALL
    );
  }
  display(seasonKey: SeasonKey, locale = LocaleSchema.defaultLocale) {
    return this.getValue(seasonKey)['i18n'][locale];
  }
  getMonthRange(seasonKey: SeasonKey) {
    return this.getValue(seasonKey).monthRange;
  }
}

const seasonSchema = new SeasonSchema();

export namespace SeasonUtils {
  export type Key = SeasonKey;
  export type Value = SeasonValue;
  export type SchemaName = SeasonSchemaName;
  export const schema = seasonSchema;
}
