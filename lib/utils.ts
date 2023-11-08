import { clsx, type ClassValue } from 'clsx';
import { toLower, toUpper } from 'lodash-es';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

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

const numbersSchema = z.array(z.number());

export class KeyValueSchema<
  TKey extends string,
  TValue extends string | number,
> {
  protected readonly keySchema: z.ZodEnum<[TKey, ...TKey[]]>;
  protected readonly keyValueMap: Map<TKey, TValue>;
  readonly keys: z.ZodEnum<[TKey, ...TKey[]]>['enum'];
  readonly defaultKey: TKey;

  constructor(
    keySchema: z.ZodEnum<[TKey, ...TKey[]]>,
    defaultKey: TKey,
    keyValueMap: Map<TKey, TValue>
  ) {
    this.keySchema = keySchema;
    this.keys = keySchema.enum;
    this.defaultKey = defaultKey;
    this.keyValueMap = keyValueMap;
  }
  getKeyByValue(value: TValue) {
    for (let [mapKey, mapValue] of this.keyValueMap.entries()) {
      if (value === mapValue) return mapKey;
    }
    return this.defaultKey;
  }
  getValue(key: TKey) {
    const value = this.keyValueMap.get(key);
    if (typeof value !== 'undefined') {
      return value;
    } else {
      return this.parseKey(key) as never;
    }
  }
  getAllKeys() {
    return Object.values(this.keys) as TKey[];
  }
  getAllValues() {
    return this.getAllKeys().map((key) => this.getValue(key));
  }
  getDefaultValue() {
    return this.getValue(this.defaultKey);
  }
  getFirstValue() {
    const values = this.getAllValues();
    const valueSet = new Set(values);
    const defaultValue = this.getDefaultValue();
    // 중복 제거한 배열의 길이와 원본 배열의 길이가 같다면, 기본(default) 값을 위해서 다른 값들과 구별된 값을 설정했을 것이다. 그러므로 기본(default) 값을 원본 배열에서 제외해주어야한다.
    // 반대로 중복 제거한 배열의 길이와 원본 배열의 길이가 다르다면, 기본(default) 값은 원본 배열 중 하나의 값 중에서 고른 것이다. 그러므로 default 값을 원본에서 제외할 필요없다.
    if (valueSet.size === values.length) {
      values.splice(values.indexOf(defaultValue), 1);
    }
    numbersSchema.parse(values);
    return Math.min(...(values as number[]));
  }
  getLastValue() {
    const values = this.getAllValues();
    const valueSet = new Set(values);
    const defaultValue = this.getDefaultValue();
    if (valueSet.size === values.length) {
      values.splice(values.indexOf(defaultValue), 1);
    }
    numbersSchema.parse(values);
    return Math.max(...(values as number[]));
  }
  getValueRange() {
    return [this.getFirstValue(), this.getLastValue()];
  }
  parseKey(maybeKey: unknown) {
    this.keySchema.parse(maybeKey);
  }
  safeParseKey(maybeKey: unknown) {
    return this.keySchema.safeParse(maybeKey).success;
  }
}

// export interface QuerySchema<
//   TKey extends string,
//   TValue extends string | number,
//   TDict = unknown,
// > {
//   readonly keys?: unknown;
//   getDefaultKey: () => TKey;
//   getDefaultValue: () => TValue;
//   getAllKeys: () => TKey[];
//   getAllValues: () => TValue[];
//   getKeyByValue: (value: TValue) => TKey;
//   getValue: (key: TKey) => TValue;
//   getKeyDict?: () => { [key: string]: TDict };
//   parseKey: (key: unknown) => void;
//   safeParseKey: (key: unknown) => boolean;
//   refineKey?: (keyLike: string) => TKey;
//   display?: (key: TKey) => string;
// }

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

export const isServer = typeof window === 'undefined';

export function isValidJson(value: string) {
  try {
    return JSON.parse(value) && !!value;
  } catch {
    return false;
  }
}
