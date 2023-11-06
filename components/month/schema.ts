import { z } from 'zod';

import { toUpperCase, type QuerySchema } from '@/lib/utils';

const monthKeySchema = z.enum([
  'ALL',
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]);

type MonthKeySchema = typeof monthKeySchema;

type MonthKey = z.infer<typeof monthKeySchema>;

type MonthValue = number;

type MonthDict = {
  name: MonthKey;
  displayName: string;
  value: MonthValue;
};

class MonthSchema implements QuerySchema<MonthKey, MonthValue, MonthDict> {
  private readonly keySchema: MonthKeySchema;
  readonly keys: MonthKeySchema['enum'];

  static keyValueMap = new Map<MonthKey, number>()
    .set('ALL', 0)
    .set('JAN', 1)
    .set('FEB', 2)
    .set('MAR', 3)
    .set('APR', 4)
    .set('MAY', 5)
    .set('JUN', 6)
    .set('JUL', 7)
    .set('AUG', 8)
    .set('SEP', 9)
    .set('OCT', 10)
    .set('NOV', 11)
    .set('DEC', 12);

  constructor() {
    this.keySchema = monthKeySchema;
    this.keys = monthKeySchema.enum;
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
  getKeyByValue(monthValue: MonthValue) {
    for (let [key, value] of MonthSchema.keyValueMap.entries()) {
      if (monthValue === value) return key;
    }
    return this.getDefaultKey();
  }
  getValue(monthKey: MonthKey) {
    const monthValue = MonthSchema.keyValueMap.get(monthKey);
    if (typeof monthValue !== 'undefined') {
      return monthValue;
    } else {
      return this.parseKey(monthKey) as never;
    }
  }
  getFirstValue() {
    const defaultValue = this.getDefaultValue();
    const values = this.getAllValues();
    const valueSet = new Set(values);
    if (valueSet.size === values.length) {
      values.splice(values.indexOf(defaultValue), 1);
    }
    return Math.min(...values);
  }
  getLastValue() {
    const defaultValue = this.getDefaultValue();
    const values = this.getAllValues();
    const valueSet = new Set(values);
    if (valueSet.size === values.length) {
      values.splice(values.indexOf(defaultValue), 1);
    }
    return Math.max(...values);
  }
  getValueRange() {
    return [this.getFirstValue(), this.getLastValue()];
  }
  parseKey(maybeMonthKey: unknown) {
    this.keySchema.parse(maybeMonthKey);
  }
  safeParseKey(maybeMonthKey: unknown) {
    return this.keySchema.safeParse(maybeMonthKey).success;
  }
  refineKey(monthKeyLike: string) {
    const upperCasedKey = toUpperCase(monthKeyLike);
    this.parseKey(upperCasedKey);
    return upperCasedKey as MonthKey;
  }
  getKeyDict(format?: 'short' | 'long', locale?: 'ko' | 'en') {
    return this.getAllKeys().reduce(
      (keyDict, key) => {
        keyDict[key] = {
          name: key,
          displayName: this.display(key, format, locale),
          value: this.getValue(key),
        };
        return keyDict;
      },
      {} as Record<MonthKey, MonthDict>
    );
  }
  display(
    monthKey: MonthKey,
    format: 'short' | 'long' = 'short',
    locale: 'ko' | 'en' = 'ko'
  ) {
    if (monthKey === 'ALL') {
      const text = locale.startsWith('ko') ? '매달' : 'Every Month';
      const rangeText = this.getValueRange().join('-');
      return format === 'long' ? text.concat(`(${rangeText})`) : text;
    }
    return this.getMonthName(this.getValue(monthKey), 'long', locale);
  }
  protected getMonthName(
    monthValue: MonthValue,
    format: Intl.DateTimeFormatOptions['month'] = 'short',
    locale: 'ko' | 'en' = 'ko'
  ) {
    const [firstMonthValue, lastMonthValue] = this.getValueRange();
    if (monthValue < firstMonthValue || monthValue > lastMonthValue) {
      throw new Error(
        `month value must be in ${firstMonthValue} to ${lastMonthValue}`
      );
    }
    const today = new Date();
    today.setMonth(
      // JS 날짜 포맷에서 첫 번째 월의 값이 0부터 시작하기에 현재 스키마에서 사용하는 첫 번째 월의 값을 제하여 보간한다.
      firstMonthValue === 0 ? monthValue : monthValue - firstMonthValue
    );
    return today.toLocaleString(locale, { month: format });
  }
}

const monthSchema = new MonthSchema();

export { monthSchema, type MonthKey, type MonthValue };
