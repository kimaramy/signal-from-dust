import { z } from 'zod';

import { toLowerCase, toUpperCase, type QuerySchema } from '@/lib/utils';
import { type MonthValue } from '@/components/month';

const seasonKeySchema = z.enum(['ALL', 'SPRING', 'SUMMER', 'FALL', 'WINTER']);

type SeasonKeySchema = typeof seasonKeySchema;

type SeasonKey = z.infer<typeof seasonKeySchema>;

type SeasonValue = Lowercase<SeasonKey>;

type SeasonDict = {
  name: SeasonKey;
  displayName: string;
  value: SeasonValue;
  monthRange: MonthValue[];
};

class SeasonSchema implements QuerySchema<SeasonKey, SeasonValue, SeasonDict> {
  private readonly keySchema: SeasonKeySchema;
  readonly keys: SeasonKeySchema['Values'];

  constructor() {
    this.keySchema = seasonKeySchema;
    this.keys = seasonKeySchema.Values;
  }
  getDefaultKey() {
    return this.keySchema.Values.ALL;
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
  getKeyByValue(seasonValue: SeasonValue) {
    return toUpperCase(seasonValue);
  }
  getValue(seasonKey: SeasonKey) {
    return toLowerCase(seasonKey);
  }
  parseKey(maybeSeasonKey: unknown) {
    this.keySchema.parse(maybeSeasonKey);
  }
  safeParseKey(maybeSeasonKey: unknown) {
    return this.keySchema.safeParse(maybeSeasonKey).success;
  }
  refineKey(seasonKeyLike: string) {
    const upperCasedKey = toUpperCase(seasonKeyLike);
    this.parseKey(upperCasedKey);
    return upperCasedKey as SeasonKey;
  }
  getKeyDict(format?: unknown, locale?: 'ko' | 'en') {
    return this.getAllKeys().reduce(
      (keyDict, key) => {
        keyDict[key] = {
          name: key,
          displayName: this.display(key, format, locale),
          value: this.getValue(key),
          monthRange: this.getMonthRange(key),
        };
        return keyDict;
      },
      {} as Record<SeasonKey, SeasonDict>
    );
  }
  display(
    seasonKey: SeasonKey,
    _format: unknown = null,
    locale: 'ko' | 'en' = 'ko'
  ) {
    const isKorean = locale.startsWith('ko');
    switch (seasonKey) {
      case 'ALL':
        return isKorean ? '사계절' : 'Every Season';
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
  getMonthRange(seasonKey: SeasonKey) {
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
