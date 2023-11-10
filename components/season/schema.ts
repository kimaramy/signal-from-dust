import { z } from 'zod';

import { KeyValueSchema, toLowerCase } from '@/lib/utils';
import { LocaleSchema } from '@/components/locale';
import { type MonthValue } from '@/components/month';

const seasonKeys = ['ALL', 'SPRING', 'SUMMER', 'FALL', 'WINTER'] as const;

const seasonKeySchema = z.enum(seasonKeys);

type SeasonKey = z.infer<typeof seasonKeySchema>;

type SeasonValue = Lowercase<SeasonKey>;

const seasonKeyValueMap = new Map<SeasonKey, SeasonValue>(
  seasonKeys.map((seasonKey) => [seasonKey, toLowerCase(seasonKey)])
);

class SeasonSchema extends KeyValueSchema<SeasonKey, SeasonValue> {
  constructor() {
    super(seasonKeySchema, seasonKeySchema.enum.ALL, seasonKeyValueMap);
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
      default:
        return this.parseKey(seasonKey) as never;
    }
  }
}

const seasonSchema = new SeasonSchema();

export { seasonSchema, type SeasonKey, type SeasonValue };
