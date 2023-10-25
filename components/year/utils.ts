import { getYearValue, YearKey } from './schema';

export function toYearName(
  value: number,
  format: Intl.DateTimeFormatOptions['year'] = 'numeric',
  locale: Intl.LocalesArgument = 'ko-KR'
) {
  const date = new Date();
  date.setFullYear(value);
  return date.toLocaleString(locale, { year: format });
}

export function toYearSelectLabel(yearKey: YearKey) {
  switch (yearKey) {
    case 'All':
      return '전체 연도';
    default:
      return toYearName(getYearValue(yearKey), 'numeric', 'ko-KR');
  }
}
