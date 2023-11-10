import { z } from 'zod';

import { KeyValueSchema } from '@/lib/utils';
import { LocaleSchema } from '@/components/locale';

const weekdayKeys = [
  'ALL',
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
] as const;

const weekdayKeySchema = z.enum(weekdayKeys);

type WeekdayKey = z.infer<typeof weekdayKeySchema>;

type WeekdayValue = number;

const weekdayKeyValueMap = new Map<WeekdayKey, WeekdayValue>()
  .set('ALL', 0)
  .set('SUNDAY', 1)
  .set('MONDAY', 2)
  .set('TUESDAY', 3)
  .set('WEDNESDAY', 4)
  .set('THURSDAY', 5)
  .set('FRIDAY', 6)
  .set('SATURDAY', 7);

class WeekdaySchema extends KeyValueSchema<WeekdayKey, WeekdayValue> {
  constructor() {
    super(weekdayKeySchema, weekdayKeySchema.enum.ALL, weekdayKeyValueMap);
  }
  protected getWeekdayName(
    weekdayValue: WeekdayValue,
    format: Intl.DateTimeFormatOptions['weekday'] = 'short',
    locale = LocaleSchema.defaultLocale
  ) {
    const [firstWeekdayValue, lastWeekdayValue] = this.getValueRange();
    if (weekdayValue < firstWeekdayValue || weekdayValue > lastWeekdayValue) {
      throw new Error(
        `weekday value ranges from ${firstWeekdayValue} to ${lastWeekdayValue}.`
      );
    }
    const today = new Date();
    const todayValue = today.getDay();
    // JS 날짜 포맷에서 첫 번째 요일의 값이 0부터 시작하기에 현재 스키마에서 사용하는 첫 번째 요일 값을 제하여 보간한다.
    today.setDate(
      today.getDate() + weekdayValue - todayValue - firstWeekdayValue
    );
    return today.toLocaleString(locale, { weekday: format });
  }
  display(
    weekdayKey: WeekdayKey,
    format: 'short' | 'long' = 'short',
    locale = LocaleSchema.defaultLocale
  ) {
    switch (weekdayKey) {
      case 'ALL':
        return LocaleSchema.isKorean(locale) ? '요일마다' : 'Every weekday';
      default:
        return this.getWeekdayName(this.getValue(weekdayKey), format, locale);
    }
  }
}

const weekdaySchema = new WeekdaySchema();

export { weekdaySchema, type WeekdayKey, type WeekdayValue };
