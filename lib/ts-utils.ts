import * as enumFor from 'enum-for';

export type ValueOf<T> = T[keyof T];

export type KeyOf<T> = keyof T;

export type NonEmptyArray<T> = [T, ...T[]];

export type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>]
  ? U
  : never;

export function stringUnionToArray<T>() {
  return <U extends NonEmptyArray<T>>(...elements: MustInclude<T, U>) =>
    elements;
}

export const getAllEnumEntries = enumFor.getAllEnumEntries;

export const getAllEnumKeys = enumFor.getAllEnumKeys;

export const getAllEnumValues = enumFor.getAllEnumValues;

export function getEnumKeyByValue<T, K extends T[keyof T]>(
  enumType: T,
  value: K
) {
  const enumMap = new Map(enumFor.getAllEnumEntries(enumType));
  for (let [enumKey, enumValue] of enumMap.entries()) {
    if (enumValue === value) return enumKey;
  }
}
