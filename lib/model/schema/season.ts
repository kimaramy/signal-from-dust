import { z } from 'zod';

import { toLowerCase } from '@/lib/utils';

import { MapSchema } from './base';
import { LocaleSchema } from './locale';
import { type MonthValue } from './month';

const seasonSchemaName = 'season';

const seasonKeys = ['ALL', 'SPRING', 'SUMMER', 'FALL', 'WINTER'] as const;

const seasonKeySchema = z.enum(seasonKeys);

type SeasonSchemaName = typeof seasonSchemaName;

type SeasonKey = z.infer<typeof seasonKeySchema>;

type SeasonValue = Lowercase<SeasonKey>;

const seasonMap = new Map<SeasonKey, SeasonValue>(
  seasonKeys.map((seasonKey) => [seasonKey, toLowerCase(seasonKey)])
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
    const isKorean = LocaleSchema.isKorean(locale);
    switch (seasonKey) {
      case 'ALL':
        return isKorean ? '사계절' : 'Every season';
      case 'SPRING':
        return isKorean ? '봄' : 'Spring';
      case 'SUMMER':
        return isKorean ? '여름' : 'Summer';
      case 'FALL':
        return isKorean ? '가을' : 'Fall';
      case 'WINTER':
        return isKorean ? '겨울' : 'Winter';
      default:
        return this.parseKey(seasonKey) as never;
    }
  }
  getMonthRange(seasonKey: SeasonKey): MonthValue[] {
    switch (seasonKey) {
      case 'ALL':
        return new Array(12).fill(0).map((_, i) => i + 1);
      case 'SPRING':
        return [3, 4, 5];
      case 'SUMMER':
        return [6, 7, 8];
      case 'FALL':
        return [9, 10, 11];
      case 'WINTER':
        return [1, 2, 12];
      default:
        return this.parseKey(seasonKey) as never;
    }
  }
}

const seasonSchema = new SeasonSchema();

export {
  seasonSchema,
  type SeasonSchemaName,
  type SeasonKey,
  type SeasonValue,
};
