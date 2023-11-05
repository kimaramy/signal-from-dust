import { z } from 'zod';

import { QuerySchema, toUpperCase } from '@/lib/utils';

const weekdayKeySchema = z.enum([
  'ALL',
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
]);

type WeekdayKeySchema = typeof weekdayKeySchema;

type WeekdayKey = z.infer<WeekdayKeySchema>;

type WeekdayValue = number;

type WeekdayDict = {
  name: WeekdayKey;
  displayName: string;
  value: WeekdayValue;
};

class WeekdaySchema
  implements QuerySchema<WeekdayKey, WeekdayValue, WeekdayDict>
{
  private readonly keySchema: WeekdayKeySchema;
  readonly keys: WeekdayKeySchema['enum'];

  static keyValueMap = new Map<WeekdayKey, number>()
    .set('ALL', 0)
    .set('SUNDAY', 1)
    .set('MONDAY', 2)
    .set('TUESDAY', 3)
    .set('WEDNESDAY', 4)
    .set('THURSDAY', 5)
    .set('FRIDAY', 6)
    .set('SATURDAY', 7);

  constructor() {
    this.keySchema = weekdayKeySchema;
    this.keys = weekdayKeySchema.enum;
  }
  getDefaultKey() {
    return this.keySchema.enum.ALL;
  }
  getDefaultValue() {
    return this.getValue(this.getDefaultKey());
  }
  getAllKeys() {
    return Object.values(this.keySchema.enum);
  }
  getAllValues() {
    return this.getAllKeys().map((key) => this.getValue(key));
  }
  getKeyByValue(weekdayValue: WeekdayValue) {
    let weekdayKey = '';
    for (let [key, value] of WeekdaySchema.keyValueMap.entries()) {
      if (weekdayValue === value) {
        weekdayKey = key;
        break;
      }
    }
    return this.parseKey(weekdayKey) as never;
  }
  getValue(weekdayKey: WeekdayKey) {
    const weekdayValue = WeekdaySchema.keyValueMap.get(weekdayKey);
    if (typeof weekdayValue !== 'undefined') {
      return weekdayValue;
    } else {
      return this.parseKey(weekdayKey) as never;
    }
  }
  parseKey(maybeWeekdayKey: unknown) {
    this.keySchema.parse(maybeWeekdayKey);
  }
  safeParseKey(maybeWeekdayKey: unknown) {
    return this.keySchema.safeParse(maybeWeekdayKey).success;
  }
  refineKey(weekdayKeyLike: string) {
    const upperCasedKey = toUpperCase(weekdayKeyLike);
    this.parseKey(upperCasedKey);
    return upperCasedKey as WeekdayKey;
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
      {} as Record<WeekdayKey, WeekdayDict>
    );
  }
  display(weekdayKey: WeekdayKey, locale = 'ko-KR') {
    const isKorean = locale === 'ko-KR';
    switch (weekdayKey) {
      case 'ALL':
        return isKorean ? '요일마다' : 'Every Weekday';
      default:
        return this.getWeekdayName(
          this.getValue(weekdayKey) - 1,
          'long',
          'ko-KR'
        );
    }
  }
  protected getWeekdayName(
    value: number,
    format: Intl.DateTimeFormatOptions['weekday'] = 'long',
    locale: Intl.LocalesArgument = 'ko-KR'
  ) {
    if (value > 6) throw new Error(`value must be 0 to 6`);
    const today = new Date();
    const todayValue = today.getDay();
    today.setDate(today.getDate() + Math.abs(value - todayValue));
    return today.toLocaleString(locale, { weekday: format });
  }
}

const weekdaySchema = new WeekdaySchema();

export { weekdaySchema, type WeekdayKey, type WeekdayValue };
