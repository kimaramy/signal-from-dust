export type ValueOf<T> = T[keyof T];

export type KeyOf<T> = keyof T;

export type NonEmptyArray<T> = [T, ...T[]];

export type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>]
  ? U
  : never;

export type Binary = '0' | '1';
