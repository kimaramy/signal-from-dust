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

  static keyValueMap = new Map<WeekdayKey, WeekdayValue>()
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
    for (let [key, value] of WeekdaySchema.keyValueMap.entries()) {
      if (weekdayValue === value) return key;
    }
    return this.getDefaultKey();
  }
  getValue(weekdayKey: WeekdayKey) {
    const weekdayValue = WeekdaySchema.keyValueMap.get(weekdayKey);
    if (typeof weekdayValue !== 'undefined') {
      return weekdayValue;
    } else {
      return this.parseKey(weekdayKey) as never;
    }
  }
  getFirstValue() {
    const values = this.getAllValues();
    const valueSet = new Set(values);
    const defaultValue = this.getDefaultValue();
    if (valueSet.size === values.length) {
      values.splice(values.indexOf(defaultValue), 1);
    }
    return Math.min(...values);
  }
  getLastValue() {
    const values = this.getAllValues();
    const valueSet = new Set(values);
    const defaultValue = this.getDefaultValue();
    if (valueSet.size === values.length) {
      values.splice(values.indexOf(defaultValue), 1);
    }
    return Math.max(...values);
  }
  getValueRange() {
    return [this.getFirstValue(), this.getLastValue()];
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
  getKeyDict(format: 'short' | 'long' = 'short', locale?: 'ko' | 'en') {
    return this.getAllKeys().reduce(
      (keyDict, key) => {
        keyDict[key] = {
          name: key,
          displayName: this.display(key, format, locale),
          value: this.getValue(key),
        };
        return keyDict;
      },
      {} as Record<WeekdayKey, WeekdayDict>
    );
  }
  display(
    weekdayKey: WeekdayKey,
    format: 'short' | 'long' = 'short',
    locale: 'ko' | 'en' = 'ko'
  ) {
    switch (weekdayKey) {
      case 'ALL':
        return locale.startsWith('ko') ? '요일마다' : 'Every Weekday';
      default:
        return this.getWeekdayName(this.getValue(weekdayKey), format, locale);
    }
  }
  protected getWeekdayName(
    weekdayValue: number,
    format: Intl.DateTimeFormatOptions['weekday'] = 'short',
    locale: 'ko' | 'en' = 'ko'
  ) {
    const [firstWeekdayValue, lastWeekdayValue] = this.getValueRange();
    if (weekdayValue < firstWeekdayValue || weekdayValue > lastWeekdayValue) {
      throw new Error(
        `weekday value ranges from ${firstWeekdayValue} to ${lastWeekdayValue}.`
      );
    }
    const today = new Date();
    const todayValue = today.getDay();
    today.setDate(
      today.getDate() +
        Math.abs(
          // JS 날짜 포맷에서 첫 번째 요일의 값이 0부터 시작하기에 현재 스키마에서 사용하는 첫 번째 요일 값을 제하여 보간한다.
          firstWeekdayValue === 0
            ? weekdayValue - todayValue
            : weekdayValue - todayValue - firstWeekdayValue
        )
    );
    return today.toLocaleString(locale, { weekday: format });
  }
}

const weekdaySchema = new WeekdaySchema();

export { weekdaySchema, type WeekdayKey, type WeekdayValue };
