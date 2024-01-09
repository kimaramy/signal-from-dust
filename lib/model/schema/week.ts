import { z } from 'zod';

import { MapSchema } from './base';
import { LocaleSchema } from './locale';

const weekSchemaName = 'week';

const weekKeys = [
  'ALL',
  ...new Array(53).fill(0).map((_, i) => `${i + 1}`),
] as const;

const weekKeySchema = z.enum(weekKeys);

type WeekSchemaName = typeof weekSchemaName;

type WeekKey = z.infer<typeof weekKeySchema>;

type WeekValue = number;

const weekMap = new Map<WeekKey, WeekValue>(
  weekKeys.map((weekKey, index) => [weekKey, index])
);

class WeekSchema extends MapSchema<WeekSchemaName, WeekKey, WeekValue> {
  constructor() {
    super(weekSchemaName, weekMap, weekKeySchema, weekKeys[0]);
  }
  protected getOrdinalName(weekValue: WeekValue) {
    const [firstWeekValue, lastWeekValue] = this.getValueRange();
    if (weekValue < firstWeekValue || weekValue > lastWeekValue) {
      throw new Error(
        `week value ranges from ${firstWeekValue} to ${lastWeekValue}.`
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

export namespace WeekUtils {
  export type Key = WeekKey;
  export type Value = WeekValue;
  export type SchemaName = WeekSchemaName;
  export const schema = weekSchema;
}
