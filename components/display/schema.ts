import { z } from 'zod';

import { toLowerCase, toUpperCase, type QuerySchema } from '@/lib/utils';
import { LocaleSchema, type AvailableLocale } from '@/components/locale';

const displayKeySchema = z.enum(['FULL', 'AUTO']);

type DisplayKeySchema = typeof displayKeySchema;

type DisplayKey = z.infer<typeof displayKeySchema>;

type DisplayValue = Lowercase<DisplayKey>;

type DisplayDict = {
  name: DisplayKey;
  displayName: string;
  value: DisplayValue;
};

class DisplaySchema
  implements QuerySchema<DisplayKey, DisplayValue, DisplayDict>
{
  private readonly keySchema: DisplayKeySchema;
  readonly keys: DisplayKeySchema['enum'];

  constructor() {
    this.keySchema = displayKeySchema;
    this.keys = displayKeySchema.enum;
  }
  getDefaultKey() {
    return this.keySchema.enum.AUTO;
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
  getKeyByValue(displayValue: DisplayValue) {
    return toUpperCase(displayValue);
  }
  getValue(seasonKey: DisplayKey) {
    return toLowerCase(seasonKey);
  }
  parseKey(maybeDisplayKey: unknown) {
    this.keySchema.parse(maybeDisplayKey);
  }
  safeParseKey(maybeDisplayKey: unknown) {
    return this.keySchema.safeParse(maybeDisplayKey).success;
  }
  refineKey(displayKeyLike: string) {
    const upperCasedKey = toUpperCase(displayKeyLike);
    this.parseKey(upperCasedKey);
    return upperCasedKey as DisplayKey;
  }
  getKeyDict(locale?: AvailableLocale) {
    return this.getAllKeys().reduce(
      (keyDict, key) => {
        keyDict[key] = {
          name: key,
          displayName: this.display(key, locale),
          value: this.getValue(key),
        };
        return keyDict;
      },
      {} as Record<DisplayKey, DisplayDict>
    );
  }
  display(displayKey: DisplayKey, locale = LocaleSchema.defaultLocale) {
    const isKorean = LocaleSchema.isKorean(locale);
    switch (displayKey) {
      case 'AUTO':
        return isKorean ? '전체보기' : 'List View';
      case 'FULL':
        return isKorean ? '개별보기' : 'Item View';
      default:
        return this.parseKey(displayKey) as never;
    }
  }
}

const displaySchema = new DisplaySchema();

export { displaySchema, type DisplayKey, type DisplayValue };
