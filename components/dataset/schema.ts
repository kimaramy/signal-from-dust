import { z } from 'zod';

import {
  CustomValueMapSchema,
  LocaleSchema,
  type CustomValueTemplate,
} from '@/lib/model';

const datasetOrderSchemaName = 'datasetOrder';

const datasetOrderKeys = ['TIME', 'GRADE'] as const;

const datasetOrderKeySchema = z.enum(datasetOrderKeys);

type DatasetOrderSchemaName = typeof datasetOrderSchemaName;

type DatasetOrderKey = z.infer<typeof datasetOrderKeySchema>;

type DatasetOrderValue = CustomValueTemplate<DatasetOrderKey>;

const datasetOrderValues: ReadonlyArray<DatasetOrderValue> = [
  {
    name: 'TIME',
    order: 0,
    i18n: {
      en: 'by Time',
      ko: '시간순',
    },
  },
  {
    name: 'GRADE',
    order: 1,
    i18n: {
      en: 'by Grade',
      ko: '높은 등급순',
    },
  },
];

const datasetOrderMap = new Map(
  datasetOrderKeys.map((datasetOrderKey) => [
    datasetOrderKey,
    datasetOrderValues.find((value) => value.name === datasetOrderKey)!,
  ])
);

class DatasetOrderSchema extends CustomValueMapSchema<
  DatasetOrderSchemaName,
  DatasetOrderKey,
  DatasetOrderValue
> {
  constructor() {
    super(
      datasetOrderSchemaName,
      datasetOrderMap,
      datasetOrderKeySchema,
      datasetOrderKeySchema.enum.TIME
    );
  }
  display(
    datasetOrderKey: DatasetOrderKey,
    locale = LocaleSchema.defaultLocale
  ) {
    return this.getValue(datasetOrderKey)['i18n'][locale];
  }
}

const datasetOrderSchema = new DatasetOrderSchema();

export namespace DatasetOrderUtils {
  export type Key = DatasetOrderKey;
  export type Value = DatasetOrderValue;
  export type SchemaName = DatasetOrderSchemaName;
  export const schema = datasetOrderSchema;
}
