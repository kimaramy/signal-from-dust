import { z } from 'zod';

import { MapSchema } from './base';
import { LocaleSchema } from './locale';

const monthSchemaName = 'month';

const monthKeys = [
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
] as const;

const monthKeySchema = z.enum(monthKeys);

type MonthSchemaName = typeof monthSchemaName;

type MonthKey = z.infer<typeof monthKeySchema>;

type MonthValue = number;

const monthMap = new Map<MonthKey, MonthValue>()
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

class MonthSchema extends MapSchema<MonthSchemaName, MonthKey, MonthValue> {
  constructor() {
    super(monthSchemaName, monthMap, monthKeySchema, monthKeySchema.enum.ALL);
  }
  protected getMonthName(
    monthValue: MonthValue,
    format: Intl.DateTimeFormatOptions['month'] = 'short',
    locale = LocaleSchema.defaultLocale
  ) {
    const [firstMonthValue, lastMonthValue] = this.getValueRange();
    if (monthValue < firstMonthValue || monthValue > lastMonthValue) {
      throw new Error(
        `month value ranges from ${firstMonthValue} to ${lastMonthValue}.`
      );
    }
    const today = new Date();
    today.setMonth(
      // JS 날짜 포맷에서 첫 번째 월의 값이 0부터 시작하기에 현재 스키마에서 사용하는 첫 번째 월의 값을 제하여 보간한다.
      firstMonthValue === 0 ? monthValue : monthValue - firstMonthValue
    );
    return today.toLocaleString(locale, { month: format });
  }
  display(
    monthKey: MonthKey,
    format: 'short' | 'long' = 'short',
    locale = LocaleSchema.defaultLocale
  ) {
    if (monthKey === 'ALL') {
      const text = LocaleSchema.isKorean(locale) ? '매달' : 'Every month';
      const rangeText = this.getValueRange().join('-');
      return format === 'long' ? text.concat(`(${rangeText})`) : text;
    }
    return this.getMonthName(this.getValue(monthKey), 'long', locale);
  }
}

const monthSchema = new MonthSchema();

export { monthSchema, type MonthSchemaName, type MonthKey, type MonthValue };
