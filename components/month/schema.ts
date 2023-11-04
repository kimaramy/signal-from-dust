import { z } from 'zod';

import { type QuerySchema } from '@/lib/utils';

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
      if (monthValue === value) {
        return key;
      }
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
  parseKey(maybeMonthKey: unknown) {
    this.keySchema.parse(maybeMonthKey);
  }
  safeParseKey(maybeMonthKey: unknown) {
    return this.keySchema.safeParse(maybeMonthKey).success;
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
      {} as Record<MonthKey, MonthDict>
    );
  }
  display(monthKey: MonthKey, locale = 'ko-KR') {
    const isKorean = locale === 'ko-KR';
    switch (monthKey) {
      case 'ALL':
        return isKorean ? '매달' : 'All Months';
      default:
        return this.getMonthName(this.getValue(monthKey), 'long', 'ko-KR');
    }
  }
  protected getMonthName(
    value: number,
    format: Intl.DateTimeFormatOptions['month'] = 'long',
    locale: Intl.LocalesArgument = 'ko-KR'
  ) {
    if (value < 1) throw new Error(`value must be at least 1`);
    const date = new Date();
    date.setMonth(value - 1);
    return date.toLocaleString(locale, { month: format });
  }
}

const monthSchema = new MonthSchema();

export { monthSchema, type MonthKey, type MonthValue };
