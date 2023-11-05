import { clsx, type ClassValue } from 'clsx';
import { toLower, toUpper } from 'lodash-es';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum QueryParamEnum {
  DataName = 'data',
  DataCollection = 'collection',
  Year = 'year',
  Season = 'season',
  Month = 'month',
  Location = 'location',
  Display = 'display',
}

export interface QuerySchema<
  TKey extends string,
  TValue extends string | number,
  TDict = unknown,
> {
  readonly keys: unknown;
  getDefaultKey: () => TKey;
  getDefaultValue: () => TValue;
  getAllKeys: () => TKey[];
  getAllValues: () => TValue[];
  getKeyByValue: (value: TValue) => TKey;
  getValue: (key: TKey) => TValue;
  getKeyDict: (locale?: string) => { [key: string]: TDict };
  parseKey: (key: unknown) => void;
  safeParseKey: (key: unknown) => boolean;
  refineKey: (keyLike: string) => TKey;
  display?: (key: TKey, locale?: string) => string;
}

export function toOrderedBy<T extends string>(arr: T[], order: T[]) {
  const orderForIndexVals = order.slice(0).reverse();
  return arr.sort((a, b) => {
    const aIndex = -orderForIndexVals.indexOf(a);
    const bIndex = -orderForIndexVals.indexOf(b);
    return aIndex - bIndex;
  });
}

export const toLowerCase = <T extends string = string>(
  nonLowerCasedString: T
) => toLower(nonLowerCasedString) as Lowercase<T>;

export const toUpperCase = <T extends string = string>(
  nonUpperCasedString: T
) => toUpper(nonUpperCasedString) as Uppercase<Lowercase<T>>;

export function toOrdinalNumberName(num: number) {
  switch (num) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
}

export const isServer = typeof window === 'undefined';

export function isValidJson(value: string) {
  try {
    return JSON.parse(value) && !!value;
  } catch {
    return false;
  }
}
