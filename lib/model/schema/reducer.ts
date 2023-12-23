import { AppCollection } from './collection';
import { AppDataName } from './dataName';
import { AppDay } from './day';
import { LocaleSchema } from './locale';
import { AppMonth } from './month';
import { AppSeason } from './season';
import { AppWeek } from './week';
import { AppWeekday } from './weekday';
import { AppYear } from './year';

const appSchemaMap = {
  locale: LocaleSchema,
  [AppCollection.schema.name]: AppCollection.schema,
  [AppDataName.schema.name]: AppDataName.schema,
  [AppDay.schema.name]: AppDay.schema,
  [AppMonth.schema.name]: AppMonth.schema,
  [AppSeason.schema.name]: AppSeason.schema,
  [AppWeek.schema.name]: AppWeek.schema,
  [AppWeekday.schema.name]: AppWeekday.schema,
  [AppYear.schema.name]: AppYear.schema,
} as const;

type AppSchemaMap = typeof appSchemaMap;

type AppSchemaName = keyof AppSchemaMap;

class AppSchema {
  static get<T extends AppSchemaName>(schemaName: T): AppSchemaMap[T] {
    return appSchemaMap[schemaName];
  }
}

export type { AppSchemaMap, AppSchemaName };

export { AppSchema };
