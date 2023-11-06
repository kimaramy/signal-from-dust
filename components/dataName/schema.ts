import { z } from 'zod';

import { toLowerCase, toUpperCase, type QuerySchema } from '@/lib/utils';

const dataNameKeySchema = z.enum(['PM_LARGE', 'PM_SMALL']);

type DataNameKeySchema = typeof dataNameKeySchema;

type DataNameKey = z.infer<typeof dataNameKeySchema>;

type DataNameValue = Lowercase<DataNameKey>;

type DataNameDict = {
  name: DataNameKey;
  displayName: string;
  value: DataNameValue;
};

class DataNameSchema
  implements QuerySchema<DataNameKey, DataNameValue, DataNameDict>
{
  private readonly keySchema: DataNameKeySchema;
  readonly keys: DataNameKeySchema['enum'];

  constructor() {
    this.keySchema = dataNameKeySchema;
    this.keys = dataNameKeySchema.enum;
  }
  getDefaultKey() {
    return this.keySchema.enum.PM_LARGE;
  }
  getDefaultValue() {
    return this.getValue(this.getDefaultKey());
  }
  getAllKeys() {
    return Object.values(this.keySchema.enum);
  }
  getAllValues() {
    return this.getAllKeys().map((key) => this.getValue(key));
  }
  getKeyByValue(dataNameValue: DataNameValue) {
    return toUpperCase(dataNameValue);
  }
  getValue(seasonKey: DataNameKey) {
    return toLowerCase(seasonKey);
  }
  parseKey(maybeDataNameKey: unknown) {
    this.keySchema.parse(maybeDataNameKey);
  }
  safeParseKey(maybeDataNameKey: unknown) {
    return this.keySchema.safeParse(maybeDataNameKey).success;
  }
  refineKey(dataNameKeyLike: string) {
    const upperCasedKey = toUpperCase(dataNameKeyLike);
    this.parseKey(upperCasedKey);
    return upperCasedKey as DataNameKey;
  }
  getKeyDict(_format?: unknown, locale?: 'ko' | 'en') {
    return this.getAllKeys().reduce(
      (keyDict, key) => {
        keyDict[key] = {
          name: key,
          displayName: this.display(key, null, locale),
          value: this.getValue(key),
        };
        return keyDict;
      },
      {} as Record<DataNameKey, DataNameDict>
    );
  }
  display(
    dataNameKey: DataNameKey,
    _format: unknown = null,
    locale: 'ko' | 'en' = 'ko'
  ) {
    const isKorean = locale.startsWith('ko');
    switch (dataNameKey) {
      case 'PM_LARGE':
        return isKorean ? '미세먼지' : 'PM10';
      case 'PM_SMALL':
        return isKorean ? '초미세먼지' : 'PM2.5';
      default:
        return this.parseKey(dataNameKey) as never;
    }
  }
}

const dataNameSchema = new DataNameSchema();

export { dataNameSchema, type DataNameKey, type DataNameValue };
