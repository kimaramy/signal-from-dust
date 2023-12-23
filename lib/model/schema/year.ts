import { z } from 'zod';

import { MapSchema } from './base';
import { LocaleSchema } from './locale';

const yearSchemaName = 'year';

const yearKeys = [
  'ALL',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
] as const;

const yearKeySchema = z.enum(yearKeys);

type YearSchemaName = typeof yearSchemaName;

type YearKey = z.infer<typeof yearKeySchema>;

type YearValue = number;

const yearMap = new Map<YearKey, YearValue>()
  .set('ALL', 0)
  .set('2015', 2015)
  .set('2016', 2016)
  .set('2017', 2017)
  .set('2018', 2018)
  .set('2019', 2019)
  .set('2020', 2020)
  .set('2021', 2021)
  .set('2022', 2022);

class YearSchema extends MapSchema<YearSchemaName, YearKey, YearValue> {
  constructor() {
    super(yearSchemaName, yearMap, yearKeySchema, yearKeySchema.enum.ALL);
  }
  protected getYearName(
    yearValue: YearValue,
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
  display(
    yearKey: YearKey,
    format: 'short' | 'long' = 'short',
    locale = LocaleSchema.defaultLocale
  ) {
    if (yearKey === 'ALL') {
      const text = LocaleSchema.isKorean(locale) ? '매년' : 'Every year';
      const rangeText = this.getValueRange().join('-');
      return format === 'long' ? text.concat(`(${rangeText})`) : text;
    }
    return this.getYearName(this.getValue(yearKey), 'numeric', locale);
  }
}

const yearSchema = new YearSchema();

export namespace AppYear {
  export type Key = YearKey;
  export type Value = YearValue;
  export type SchemaName = YearSchemaName;
  export const schema = yearSchema;
}
