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

export function translateCollection(collection: Collection) {
  switch (collection) {
    case 'Yearly':
      return '연도별';
    case 'Seasonally':
      return '계절별';
    case 'Monthly':
      return '월별';
    case 'Weekly':
      return '주별';
    case 'Weekdaily':
      return '요일별';
    case 'Daily':
      return '일별';
    default:
      throw new TypeError(`${collection} is not a Collection type`);
  }
}

export function toOrderedBy<T extends string>(arr: T[], order: T[]) {
  const orderForIndexVals = order.slice(0).reverse();
  return arr.sort((a, b) => {
    const aIndex = -orderForIndexVals.indexOf(a);
    const bIndex = -orderForIndexVals.indexOf(b);
    return aIndex - bIndex;
  });
}
