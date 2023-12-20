import { z } from 'zod';

import { ModelSchema } from './base';
import { LocaleSchema } from './locale';

const dayKeys = [
  'ALL',
  ...new Array(31).fill(0).map((_, i) => `${i + 1}`),
] as const;

const dayKeySchema = z.enum(dayKeys);

type DayKeySchema = typeof dayKeySchema;

type DayKey = z.infer<DayKeySchema>;

type DayValue = number;

const dayMap = new Map<DayKey, DayValue>(
  dayKeys.map((dayKey, index) => [dayKey, index])
);

class DaySchema extends ModelSchema<DayKey, DayValue> {
  constructor() {
    super(dayKeySchema, dayKeys[0], dayMap);
  }
  protected getOrdinalName(dayValue: DayValue) {
    const [firstDayValue, lastDayValue] = this.getValueRange();
    if (dayValue < firstDayValue || dayValue > lastDayValue) {
      throw new Error(
        `day value ranges from ${firstDayValue} to ${lastDayValue}.`
      );
    }
    switch (dayValue) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      default:
        return `${dayValue}th`;
    }
  }
  display(dayKey: DayKey, locale = LocaleSchema.defaultLocale) {
    const isKorean = LocaleSchema.isKorean(locale);
    const dayValue = this.getValue(dayKey);
    const defaultDayValue = this.getDefaultValue();
    switch (dayValue) {
      case defaultDayValue:
        return isKorean ? '매일' : 'Everyday';
      default:
        return isKorean
          ? `${dayValue}일`
          : `${this.getOrdinalName(dayValue)} day`;
    }
  }
}

const daySchema = new DaySchema();

export { daySchema, type DayKey, type DayValue };
