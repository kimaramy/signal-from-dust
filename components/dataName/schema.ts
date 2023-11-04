import { toLower, toUpper } from 'lodash-es';
import { z } from 'zod';

import { type QuerySchema } from '@/lib/utils';

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
  readonly keys: DataNameKeySchema['Values'];

  constructor() {
    this.keySchema = dataNameKeySchema;
    this.keys = dataNameKeySchema.Values;
  }
  getDefaultKey() {
    return this.keySchema.Values.PM_LARGE;
  }
  getDefaultValue() {
    return this.getValue(this.getDefaultKey());
  }
  getAllKeys() {
    return Object.values(this.keySchema.Values);
  }
  getAllValues() {
    return this.getAllKeys().map((key) => this.getValue(key));
  }
  getKeyByValue(dataNameValue: DataNameValue) {
    return toUpper(dataNameValue) as DataNameKey;
  }
  getValue(seasonKey: DataNameKey) {
    return toLower(seasonKey) as DataNameValue;
  }
  parseKey(maybeDataNameKey: unknown) {
    this.keySchema.parse(maybeDataNameKey);
  }
  safeParseKey(maybeDataNameKey: unknown) {
    return this.keySchema.safeParse(maybeDataNameKey).success;
  }
  getKeyDict(locale?: string) {
    return this.getAllKeys().reduce(
      (keyDict, key) => {
        keyDict[key] = {
          name: key,
          displayName: this.display(key, locale),
          value: this.getValue(key),
        };
        return keyDict;
      },
      {} as Record<DataNameKey, DataNameDict>
    );
  }
  display(dataNameKey: DataNameKey, locale = 'ko-KR') {
    const isKorean = locale === 'ko-KR';
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
