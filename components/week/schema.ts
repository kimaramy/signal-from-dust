import { z } from 'zod';

import { KeyValueSchema } from '@/lib/utils';
import { LocaleSchema } from '@/components/locale';

const ALL = 'ALL';

const weekKeys = [
  ALL,
  ...new Array(53).fill(0).map((_, i) => `${i + 1}`),
] as const;

const weekKeySchema = z.enum(weekKeys);

type WeekKey = z.infer<typeof weekKeySchema>;

type WeekValue = number;

const weekKeyValueMap = new Map<WeekKey, WeekValue>(
  weekKeys.map((weekKey) =>
    weekKey === ALL ? [weekKey, 0] : [weekKey, Number(weekKey)]
  )
);

class WeekSchema extends KeyValueSchema<WeekKey, WeekValue> {
  constructor() {
    super(weekKeySchema, ALL, weekKeyValueMap);
  }
  protected getOrdinalName(weekValue: WeekValue) {
    const [firstWeekValue, lastWeekValue] = this.getValueRange();
    if (weekValue < firstWeekValue || weekValue > lastWeekValue) {
      throw new Error(
        `day value ranges from ${firstWeekValue} to ${lastWeekValue}.`
      );
    }
    switch (weekValue) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      default:
        return `${weekValue}th`;
    }
  }
  display(weekKey: WeekKey, locale = LocaleSchema.defaultLocale) {
    const isKorean = LocaleSchema.isKorean(locale);
    const weekValue = this.getValue(weekKey);
    const defaultWeekValue = this.getDefaultValue();
    switch (weekValue) {
      case defaultWeekValue:
        return isKorean ? '매주' : 'Every week';
      default:
        return isKorean
          ? `${weekValue}번째 주`
          : `${this.getOrdinalName(weekValue)} week`;
    }
  }
}

const weekSchema = new WeekSchema();

export { weekSchema, type WeekKey, type WeekValue };
