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

export function getEnumKeys<T extends object>(enumObj: T): KeyOf<T>[] {
  return Object.values(enumObj).filter((value) => isNaN(Number(value)));
}

export function getEnumKeyByValue<
  TEnum extends object,
  TValue = TEnum,
  TKey extends string = string,
>(obj: TEnum, value: TValue) {
  const valueIndex = Object.values(obj).indexOf(value);
  return Object.keys(obj)[valueIndex] as TKey;
}
