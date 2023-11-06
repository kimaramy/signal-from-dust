import { z } from 'zod';

import { type QuerySchema } from '@/lib/utils';

const dayNumbers = new Array(31).fill(0).map((_, i) => `${i + 1}`);

const dayKeySchema = z.enum(['ALL', ...dayNumbers]);

type DayKeySchema = typeof dayKeySchema;

type DayKey = z.infer<DayKeySchema>;

type DayValue = number;

class DaySchema implements QuerySchema<DayKey, DayValue> {
  private readonly keySchema: DayKeySchema;

  constructor() {
    this.keySchema = dayKeySchema;
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
  getKeyByValue(dayValue: DayValue) {
    if (dayValue === 0) return this.keySchema.enum.ALL;
    return String(dayValue);
  }
  getValue(dayKey: DayKey) {
    if (dayKey === this.keySchema.enum.ALL) return 0;
    return Number(dayKey);
  }
  parseKey(maybeWeekKey: unknown) {
    this.keySchema.parse(maybeWeekKey);
  }
  safeParseKey(maybeWeekKey: unknown) {
    return this.keySchema.safeParse(maybeWeekKey).success;
  }
  display(dayKey: DayKey, _format: unknown = null, locale: 'ko' | 'en' = 'ko') {
    const isKorean = locale.startsWith('ko');
    const dayValue = this.getValue(dayKey);
    switch (dayValue) {
      case 0:
        return isKorean ? '매일' : 'Every Day';
      default:
        return isKorean
          ? `${dayValue}일`
          : `${this.getOrdinalName(dayValue)} Day`;
    }
  }
  protected getOrdinalName(dayValue: DayValue) {
    if (dayValue < 1) {
      throw new Error(`day value must be over 0`);
    }
    switch (dayValue) {
      case 1:
        return `${dayValue}st`;
      case 2:
        return `${dayValue}nd`;
      case 3:
        return `${dayValue}rd`;
      default:
        return `${dayValue}th`;
    }
  }
}

const daySchema = new DaySchema();

export { daySchema, type DayKey, type DayValue };
