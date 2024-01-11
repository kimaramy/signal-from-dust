import { z } from 'zod';

import { CustomValueMapSchema, type CustomValueTemplate } from './base';
import { LocaleSchema } from './locale';

const dataNameSchemaName = 'dataName';

const dataNameKeys = ['PM_LARGE', 'PM_SMALL'] as const;

const dataNameKeySchema = z.enum(dataNameKeys);

type DataNameSchemaName = typeof dataNameSchemaName;

type DataNameKey = z.infer<typeof dataNameKeySchema>;

type DataNameValue = CustomValueTemplate<DataNameKey>;

const dataNameValues: ReadonlyArray<DataNameValue> = [
  {
    name: 'PM_LARGE',
    order: 0,
    i18n: {
      en: 'PM10',
      ko: '미세먼지',
    },
  },
  {
    name: 'PM_SMALL',
    order: 1,
    i18n: {
      en: 'PM2.5',
      ko: '초미세먼지',
    },
  },
];

const dataNameMap = new Map<DataNameKey, DataNameValue>(
  dataNameKeys.map((dataNameKey) => [
    dataNameKey,
    dataNameValues.find((dataNameValue) => dataNameValue.name === dataNameKey)!,
  ])
);

class DataNameSchema extends CustomValueMapSchema<
  DataNameSchemaName,
  DataNameKey,
  DataNameValue
> {
  constructor() {
    super(
      dataNameSchemaName,
      dataNameMap,
      dataNameKeySchema,
      dataNameKeySchema.enum.PM_LARGE
    );
  }
  display(dataNameKey: DataNameKey, locale = LocaleSchema.defaultLocale) {
    return this.getValue(dataNameKey)['i18n'][locale];
  }
}

const dataNameSchema = new DataNameSchema();

export namespace DataNameUtils {
  export type Key = DataNameKey;
  export type Value = DataNameValue;
  export type SchemaName = DataNameSchemaName;
  export const schema = dataNameSchema;
}
