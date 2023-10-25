import { getMonthValue, type MonthKey } from './schema';

export function toMonthName(
  value: number,
  format: Intl.DateTimeFormatOptions['month'] = 'long',
  locale: Intl.LocalesArgument = 'ko-KR'
) {
  const date = new Date();
  date.setMonth(value - 1);
  return date.toLocaleString(locale, { month: format });
}

export function toMonthSelectLabel(monthKey: MonthKey) {
  switch (monthKey) {
    case 'All':
      return '전체 월';
    default:
      return toMonthName(getMonthValue(monthKey), 'long', 'ko-KR');
  }
}
