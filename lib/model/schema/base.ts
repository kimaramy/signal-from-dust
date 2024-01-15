import { z } from 'zod';

import { toLowerCase, toUpperCase } from '@/lib/utils';

import { type Locale } from './locale';

export type I18n = Record<Locale, string>;

export interface CustomValueTemplate<TKey = string> {
  name: TKey;
  order: number;
  i18n: I18n;
}

export class MapSchema<
  TName extends string = string,
  TKey extends string = string,
  TValue = unknown,
> {
  protected readonly keySchema: z.ZodEnum<[TKey, ...TKey[]]>;
  protected readonly map: Map<TKey, TValue>;
  readonly keys: z.ZodEnum<[TKey, ...TKey[]]>['enum'];
  readonly defaultKey: TKey;
  readonly name: TName;

  constructor(
    name: TName,
    map: Map<TKey, TValue>,
    keySchema: z.ZodEnum<[TKey, ...TKey[]]>,
    defaultKey: TKey
  ) {
    this.name = name;
    this.map = map;
    this.keySchema = keySchema;
    this.keys = keySchema.enum;
    this.defaultKey = defaultKey;
  }
  getKeyByValue(value: TValue) {
    for (const [mapKey, mapValue] of this.map) {
      if (value === mapValue) return mapKey;
    }
    return this.defaultKey;
  }
  getValue(key: TKey) {
    const value = this.map.get(key);
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
  parseKey(maybeKey: unknown) {
    this.keySchema.parse(maybeKey);
  }
  safeParseKey(maybeKey: unknown) {
    return this.keySchema.safeParse(maybeKey).success;
  }
  lowerCaseKey(key: TKey) {
    return toLowerCase(key);
  }
  upperCaseKey(lowerCasedKey: string) {
    const upperCasedKey = toUpperCase(lowerCasedKey);
    this.parseKey(upperCasedKey);
    return upperCasedKey as TKey;
  }
  mapKeys<T>(fn: (key: TKey) => T) {
    return this.getAllKeys().map(fn);
  }
}

export class CustomValueMapSchema<
  TName extends string = string,
  TKey extends string = string,
  TValue extends object = CustomValueTemplate,
> extends MapSchema<TName, TKey, TValue> {}

export class RangedValueMapSchema<
  TName extends string = string,
  TKey extends string = string,
  TValue extends number = number,
> extends MapSchema<TName, TKey, TValue> {
  getFirstValue() {
    const values = this.getAllValues();
    const valueSet = new Set(values);
    const defaultValue = this.getDefaultValue();
    // 중복 제거한 배열의 길이와 원본 배열의 길이가 같다면, 기본(default) 값을 위해서 다른 값들과 구별된 값을 설정했을 것이다. 그러므로 기본(default) 값을 원본 배열에서 제외해주어야한다.
    // 반대로 중복 제거한 배열의 길이와 원본 배열의 길이가 다르다면, 기본(default) 값은 원본 배열 중 하나의 값 중에서 고른 것이다. 그러므로 default 값을 원본에서 제외할 필요없다.
    if (valueSet.size === values.length) {
      values.splice(values.indexOf(defaultValue), 1);
    }
    return Math.min(...(values as number[]));
  }
  getLastValue() {
    const values = this.getAllValues();
    const valueSet = new Set(values);
    const defaultValue = this.getDefaultValue();
    if (valueSet.size === values.length) {
      values.splice(values.indexOf(defaultValue), 1);
    }
    return Math.max(...(values as number[]));
  }
  getValueRange() {
    return [this.getFirstValue(), this.getLastValue()];
  }
  checkSyncWithDB(dbValues: TValue[]) {
    const values = this.getAllValues();
    const isSynced =
      dbValues.length === values.length &&
      dbValues.every((dbValue) => values.includes(dbValue));
    return isSynced;
  }
}
