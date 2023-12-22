import { z } from 'zod';

import { LocaleSchema, MapSchema } from '@/lib/model';
import { toLowerCase } from '@/lib/utils';

const displaySchemaName = 'display';

const displayKeys = ['FULL', 'AUTO'] as const;

const displayKeySchema = z.enum(displayKeys);

type DisplaySchemaName = typeof displaySchemaName;

type DisplayKey = z.infer<typeof displayKeySchema>;

type DisplayValue = Lowercase<DisplayKey>;

const displayMap = new Map<DisplayKey, DisplayValue>(
  displayKeys.map((displayKey) => [displayKey, toLowerCase(displayKey)])
);

class DisplaySchema extends MapSchema<
  DisplaySchemaName,
  DisplayKey,
  DisplayValue
> {
  constructor() {
    super(
      displaySchemaName,
      displayMap,
      displayKeySchema,
      displayKeySchema.enum.AUTO
    );
  }
  display(displayKey: DisplayKey, locale = LocaleSchema.defaultLocale) {
    const isKorean = LocaleSchema.isKorean(locale);
    switch (displayKey) {
      case 'AUTO':
        return isKorean ? '전체보기' : 'List view';
      case 'FULL':
        return isKorean ? '개별보기' : 'Item view';
      default:
        return this.parseKey(displayKey) as never;
    }
  }
}

const displaySchema = new DisplaySchema();

export { displaySchema, type DisplayKey, type DisplayValue };
