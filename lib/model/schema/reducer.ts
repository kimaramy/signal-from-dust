import { CollectionUtils } from './collection';
import { DayUtils } from './day';
import { DustUtils } from './dust';
import { ErrorSchema } from './error';
import { LocaleSchema } from './locale';
import { LocationUtils } from './location';
import { MonthUtils } from './month';
import { SeasonUtils } from './season';
import { WeekUtils } from './week';
import { WeekdayUtils } from './weekday';
import { YearUtils } from './year';

const schemaMap = {
  locale: LocaleSchema,
  error: ErrorSchema,
  [LocationUtils.schema.name]: LocationUtils.schema,
  [CollectionUtils.schema.name]: CollectionUtils.schema,
  [DustUtils.schema.name]: DustUtils.schema,
  [DayUtils.schema.name]: DayUtils.schema,
  [MonthUtils.schema.name]: MonthUtils.schema,
  [SeasonUtils.schema.name]: SeasonUtils.schema,
  [WeekUtils.schema.name]: WeekUtils.schema,
  [WeekdayUtils.schema.name]: WeekdayUtils.schema,
  [YearUtils.schema.name]: YearUtils.schema,
} as const;

type SchemaMap = typeof schemaMap;

type SchemaName = keyof SchemaMap;

class Schema {
  static get<T extends SchemaName>(schemaName: T): SchemaMap[T] {
    return schemaMap[schemaName];
  }
}

export type { SchemaMap, SchemaName };

export { Schema };
