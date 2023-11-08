import { z } from 'zod';

import { KeyValueSchema, toLowerCase } from '@/lib/utils';
import { LocaleSchema } from '@/components/locale';

const displayKeys = ['FULL', 'AUTO'] as const;

const displayKeySchema = z.enum(displayKeys);

type DisplayKey = z.infer<typeof displayKeySchema>;

type DisplayValue = Lowercase<DisplayKey>;

const displayKeyValueMap = new Map<DisplayKey, DisplayValue>(
  displayKeys.map((displayKey) => [displayKey, toLowerCase(displayKey)])
);

class DisplaySchema extends KeyValueSchema<DisplayKey, DisplayValue> {
  constructor() {
    super(displayKeySchema, displayKeySchema.enum.AUTO, displayKeyValueMap);
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
