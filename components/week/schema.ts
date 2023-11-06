import { z } from 'zod';

import { QuerySchema } from '@/lib/utils';

const weekNumbers = new Array(53).fill(0).map((_, i) => `${i + 1}`);

const weekKeySchema = z.enum(['ALL', ...weekNumbers]);

type WeekKeySchema = typeof weekKeySchema;

type WeekKey = z.infer<WeekKeySchema>;

type WeekValue = number;

class WeekSchema implements QuerySchema<WeekKey, WeekValue> {
  private readonly keySchema: WeekKeySchema;

  constructor() {
    this.keySchema = weekKeySchema;
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
  getKeyByValue(weekValue: WeekValue) {
    if (weekValue === 0) return this.keySchema.enum.ALL;
    return String(weekValue);
  }
  getValue(weekKey: WeekKey) {
    if (weekKey === this.keySchema.enum.ALL) return 0;
    return Number(weekKey);
  }
  parseKey(maybeWeekKey: unknown) {
    this.keySchema.parse(maybeWeekKey);
  }
  safeParseKey(maybeWeekKey: unknown) {
    return this.keySchema.safeParse(maybeWeekKey).success;
  }
  display(
    weekKey: WeekKey,
    _format: unknown = null,
    locale: 'ko' | 'en' = 'ko'
  ) {
    const isKorean = locale.startsWith('ko');
    const weekValue = this.getValue(weekKey);
    switch (weekValue) {
      case 0:
        return isKorean ? '매주' : 'Every Week';
      default:
        return isKorean
          ? `${weekValue}번째 주`
          : `${this.getOrdinalName(weekValue)} Week`;
    }
  }
  protected getOrdinalName(weekValue: WeekValue) {
    if (weekValue < 1) {
      throw new Error(`week value must be over 0`);
    }
    switch (weekValue) {
      case 1:
        return `${weekValue}st`;
      case 2:
        return `${weekValue}nd`;
      case 3:
        return `${weekValue}rd`;
      default:
        return `${weekValue}th`;
    }
  }
}

const weekSchema = new WeekSchema();

export { weekSchema, type WeekKey, type WeekValue };
