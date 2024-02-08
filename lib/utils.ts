import { toLower, toUpper } from 'lodash-es';

export type ValueOf<T> = T[keyof T];

export type KeyOf<T> = keyof T;

export type NonEmptyArray<T> = [T, ...T[]];

export type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>]
  ? U
  : never;

export const toLowerCase = <T extends string = string>(value: T) =>
  toLower(value) as Lowercase<T>;

export const toUpperCase = <T extends string = string>(value: T) =>
  toUpper(value) as Uppercase<Lowercase<T>>;

export function stringUnionToArray<T>() {
  return <U extends NonEmptyArray<T>>(...elements: MustInclude<T, U>) =>
    elements;
}

export function toOrderedBy<T extends string>(arr: T[], order: T[]) {
  const orderForIndexVals = order.slice(0).reverse();
  return arr.sort((a, b) => {
    const aIndex = -orderForIndexVals.indexOf(a);
    const bIndex = -orderForIndexVals.indexOf(b);
    return aIndex - bIndex;
  });
}

export const isServer = typeof window === 'undefined';

export function isValidJson(value: string) {
  try {
    return JSON.parse(value) && !!value;
  } catch {
    return false;
  }
}

export function groupArray<T = unknown>(array: T[], unit: number) {
  const result = [];
  for (let i = 0; i < array.length; i += unit) {
    result.push(array.slice(i, i + unit));
  }
  return result;
}
