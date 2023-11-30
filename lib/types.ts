export type ValueOf<T> = T[keyof T];

export type KeyOf<T> = keyof T;

export type NonEmptyArray<T> = [T, ...T[]];

export type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>]
  ? U
  : never;

export type Binary = '0' | '1';

export type SearchParams = { [key: string]: string | string[] | undefined };

export interface NextPageProps<T = string> {
  params: { [key: string]: T };
  searchParams?: SearchParams;
}

export type NextStaticPageProps<T = string> = Omit<
  NextPageProps<T>,
  'searchParams'
>;
