import { z } from 'zod';

import {
  CustomValueMapSchema,
  LocaleSchema,
  type CustomValueTemplate,
} from '@/lib/model';

const layoutSchemaName = 'layout';

const layoutKeys = ['DETAIL', 'SHORT', 'FULL'] as const;

const layoutKeySchema = z.enum(layoutKeys);

type LayoutSchemaName = typeof layoutSchemaName;

type LayoutKey = z.infer<typeof layoutKeySchema>;

type LayoutValue = CustomValueTemplate<LayoutKey> & {
  disabled: boolean;
};

const layoutValues: ReadonlyArray<LayoutValue> = [
  {
    name: 'SHORT',
    order: 0,
    disabled: false,
    i18n: {
      en: 'in Short',
      ko: '간략히',
    },
  },
  {
    name: 'DETAIL',
    order: 1,
    disabled: false,
    i18n: {
      en: 'in Detail',
      ko: '자세히',
    },
  },
  {
    name: 'FULL',
    order: 2,
    disabled: true,
    i18n: {
      en: 'on Screen',
      ko: '전체화면',
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
      layoutKeySchema.enum.SHORT
    );
  }
  display(layoutKey: LayoutKey, locale = LocaleSchema.defaultLocale) {
    return this.getValue(layoutKey)['i18n'][locale];
  }
  checkEnabled(layoutKey: LayoutKey) {
    return this.getValue(layoutKey).disabled === false;
  }
  getKeyByDevice(isMobile: boolean) {
    if (isMobile) return this.keys.SHORT;
    return this.keys.DETAIL;
  }
}

const layoutSchema = new LayoutSchema();

export namespace LayoutUtils {
  export type Key = LayoutKey;
  export type Value = LayoutValue;
  export type SchemaName = LayoutSchemaName;
  export const schema = layoutSchema;
}
