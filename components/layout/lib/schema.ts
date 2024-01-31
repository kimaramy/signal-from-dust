import { z } from 'zod';

import {
  CustomValueMapSchema,
  LocaleSchema,
  type CustomValueTemplate,
} from '@/lib/model';

const layoutSchemaName = 'layout';

const layoutKeys = ['LIST', 'GRID', 'SCREEN'] as const;

const layoutKeySchema = z.enum(layoutKeys);

type LayoutSchemaName = typeof layoutSchemaName;

type LayoutKey = z.infer<typeof layoutKeySchema>;

type LayoutValue = CustomValueTemplate<LayoutKey> & {
  disabled: boolean;
};

const layoutValues: ReadonlyArray<LayoutValue> = [
  {
    name: 'LIST',
    order: 0,
    disabled: false,
    i18n: {
      en: 'Detail',
      ko: '자세히보기',
    },
  },
  {
    name: 'GRID',
    order: 1,
    disabled: false,
    i18n: {
      en: 'Short',
      ko: '간략히보기',
    },
  },
  {
    name: 'SCREEN',
    order: 0,
    disabled: true,
    i18n: {
      en: 'Screen',
      ko: '전체화면보기',
    },
  },
];

const layoutMap = new Map(
  layoutKeys.map((layoutKey) => [
    layoutKey,
    layoutValues.find((value) => value.name === layoutKey)!,
  ])
);

class LayoutSchema extends CustomValueMapSchema<
  LayoutSchemaName,
  LayoutKey,
  LayoutValue
> {
  constructor() {
    super(
      layoutSchemaName,
      layoutMap,
      layoutKeySchema,
      layoutKeySchema.enum.LIST
    );
  }
  display(layoutKey: LayoutKey, locale = LocaleSchema.defaultLocale) {
    return this.getValue(layoutKey)['i18n'][locale];
  }
  checkEnabled(layoutKey: LayoutKey) {
    return this.getValue(layoutKey).disabled === false;
  }
}

const layoutSchema = new LayoutSchema();

export namespace LayoutUtils {
  export type Key = LayoutKey;
  export type Value = LayoutValue;
  export type SchemaName = LayoutSchemaName;
  export const schema = layoutSchema;
}
