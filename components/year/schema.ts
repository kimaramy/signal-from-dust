import { z } from 'zod';

import { toUpperCase, type QuerySchema } from '@/lib/utils';
import { LocaleSchema, type AvailableLocale } from '@/components/locale';

const yearKeySchema = z.enum([
  'ALL',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
]);

type YearKeySchema = typeof yearKeySchema;

type YearKey = z.infer<typeof yearKeySchema>;

type YearValue = number;

type YearDict = {
  name: YearKey;
  displayName: string;
  value: YearValue;
};

class YearSchema implements QuerySchema<YearKey, YearValue, YearDict> {
  private readonly keySchema: YearKeySchema;
  readonly keys: YearKeySchema['enum'];

  static keyValueMap = new Map<YearKey, number>()
    .set('ALL', 0)
    .set('2015', 2015)
    .set('2016', 2016)
    .set('2017', 2017)
    .set('2018', 2018)
    .set('2019', 2019)
    .set('2020', 2020)
    .set('2021', 2021)
    .set('2022', 2022);

  constructor() {
    this.keySchema = yearKeySchema;
    this.keys = yearKeySchema.enum;
  }
  getDefaultKey() {
    return this.keySchema.enum.ALL;
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
  getKeyByValue(yearValue: YearValue) {
    for (let [key, value] of YearSchema.keyValueMap.entries()) {
      if (yearValue === value) return key;
    }
    return this.getDefaultKey();
  }
  getValue(yearKey: YearKey) {
    const yearValue = YearSchema.keyValueMap.get(yearKey);
    if (typeof yearValue !== 'undefined') {
      return yearValue;
    } else {
      return this.parseKey(yearKey) as never;
    }
  }
  getFirstValue() {
    const values = this.getAllValues();
    const valueSet = new Set(values);
    const defaultValue = this.getDefaultValue();
    // 중복 제거한 배열의 길이와 원본 배열의 길이가 같다면, 기본(default) 값을 위해서 다른 값들과 구별된 값을 설정했을 것이다. 그러므로 기본(default) 값을 원본 배열에서 제외해주어야한다.
    // 반대로 중복 제거한 배열의 길이와 원본 배열의 길이가 다르다면, 기본(default) 값은 원본 배열 중 하나의 값 중에서 고른 것이다. 그러므로 default 값을 원본에서 제외할 필요없다.
    if (valueSet.size === values.length) {
      values.splice(values.indexOf(defaultValue), 1);
    }
    return Math.min(...values);
  }
  getLastValue() {
    const values = this.getAllValues();
    const valueSet = new Set(values);
    const defaultValue = this.getDefaultValue();
    if (valueSet.size === values.length) {
      values.splice(values.indexOf(defaultValue), 1);
    }
    return Math.max(...values);
  }
  getValueRange() {
    return [this.getFirstValue(), this.getLastValue()];
  }
  parseKey(maybeYearKey: unknown) {
    this.keySchema.parse(maybeYearKey);
  }
  safeParseKey(maybeYearKey: unknown) {
    return this.keySchema.safeParse(maybeYearKey).success;
  }
  refineKey(yearKeyLike: string) {
    const upperCasedKey = toUpperCase(yearKeyLike);
    this.parseKey(upperCasedKey);
    return upperCasedKey as YearKey;
  }
  getKeyDict(format?: 'short' | 'long', locale?: AvailableLocale) {
    return this.getAllKeys().reduce(
      (keyDict, key) => {
        keyDict[key] = {
          name: key,
          displayName: this.display(key, format, locale),
          value: this.getValue(key),
        };
        return keyDict;
      },
      {} as Record<YearKey, YearDict>
    );
  }
  display(
    yearKey: YearKey,
    format: 'short' | 'long' = 'short',
    locale = LocaleSchema.defaultLocale
  ) {
    if (yearKey === 'ALL') {
      const text = LocaleSchema.isKorean(locale) ? '매년' : 'Every Year';
      const rangeText = this.getValueRange().join('-');
      return format === 'long' ? text.concat(`(${rangeText})`) : text;
    }
    return this.getYearName(this.getValue(yearKey), 'numeric', locale);
  }
  protected getYearName(
    yearValue: number,
    format: Intl.DateTimeFormatOptions['year'] = 'numeric',
    locale = LocaleSchema.defaultLocale
  ) {
    const [firstYearValue, lastYearValue] = this.getValueRange();
    if (yearValue < firstYearValue || yearValue > lastYearValue) {
      throw new Error(
        `year value ranges from ${firstYearValue} to ${lastYearValue}.`
      );
    }
    const today = new Date();
    today.setFullYear(yearValue);
    return today.toLocaleString(locale, { year: format });
  }
}

const yearSchema = new YearSchema();

export { yearSchema, type YearKey, type YearValue };
