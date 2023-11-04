import { z } from 'zod';

import { type QuerySchema } from '@/lib/utils';

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

// const yearEnum = {
//   [yearKeySchema.enum['ALL']]: 0,
//   [yearKeySchema.enum[2015]]: 2015,
//   [yearKeySchema.enum[2016]]: 2016,
//   [yearKeySchema.enum[2017]]: 2017,
//   [yearKeySchema.enum[2018]]: 2018,
//   [yearKeySchema.enum[2019]]: 2019,
//   [yearKeySchema.enum[2020]]: 2020,
//   [yearKeySchema.enum[2021]]: 2021,
//   [yearKeySchema.enum[2022]]: 2022,
// }

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
      if (yearValue === value) {
        return key;
      }
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
  parseKey(maybeYearKey: unknown) {
    this.keySchema.parse(maybeYearKey);
  }
  safeParseKey(maybeYearKey: unknown) {
    return this.keySchema.safeParse(maybeYearKey).success;
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
      {} as Record<YearKey, YearDict>
    );
  }
  display(yearKey: YearKey, locale = 'ko-KR') {
    const isKorean = locale === 'ko-KR';
    switch (yearKey) {
      case 'ALL':
        return isKorean ? '매년' : 'All Years';
      default:
        return this.getYearName(this.getValue(yearKey), 'numeric', 'ko-KR');
    }
  }
  protected getYearName(
    year: number,
    format: Intl.DateTimeFormatOptions['year'] = 'numeric',
    locale: Intl.LocalesArgument = 'ko-KR'
  ) {
    const date = new Date();
    date.setFullYear(year);
    return date.toLocaleString(locale, { year: format });
  }
}

const yearSchema = new YearSchema();

export { yearSchema, type YearKey, type YearValue };
