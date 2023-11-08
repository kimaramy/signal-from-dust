import { z } from 'zod';

import { KeyValueSchema, toLowerCase } from '@/lib/utils';
import { LocaleSchema } from '@/components/locale';

const dataNameKeys = ['PM_LARGE', 'PM_SMALL'] as const;

const dataNameKeySchema = z.enum(dataNameKeys);

type DataNameKey = z.infer<typeof dataNameKeySchema>;

type DataNameValue = Lowercase<DataNameKey>;

const dataNameKeyValueMap = new Map<DataNameKey, DataNameValue>(
  dataNameKeys.map((dataNameKey) => [dataNameKey, toLowerCase(dataNameKey)])
);

class DataNameSchema extends KeyValueSchema<DataNameKey, DataNameValue> {
  constructor() {
    super(
      dataNameKeySchema,
      dataNameKeySchema.enum.PM_LARGE,
      dataNameKeyValueMap
    );
  }
  display(dataNameKey: DataNameKey, locale = LocaleSchema.defaultLocale) {
    const isKorean = LocaleSchema.isKorean(locale);
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
