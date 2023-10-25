import type { Collection } from './schema';

export function getDataCount(collection: Collection) {
  switch (collection) {
    case 'Yearly':
      return 8;
    case 'Seasonally':
      return 4;
    case 'Monthly':
      return 12;
    case 'Weekly':
      return 53;
    case 'Weekdaily':
      return 7;
    case 'Daily':
      return 31;
    default:
      throw new TypeError(`${collection} is not a Collection type`);
  }
}

export function toKoreanCollectionName(collection: Collection) {
  switch (collection) {
    case 'Yearly':
      return '연도별 차트';
    case 'Seasonally':
      return '계절별 차트';
    case 'Monthly':
      return '월별 차트';
    case 'Weekly':
      return '주별 차트';
    case 'Weekdaily':
      return '요일별 차트';
    case 'Daily':
      return '일별 차트';
    default:
      throw new TypeError(`${collection} is not a Collection type`);
  }
}
