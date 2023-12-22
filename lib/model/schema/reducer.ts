import { collectionSchema, type CollectionSchemaName } from './collection';
import { dataNameSchema, type DataNameSchemaName } from './dataName';
import { daySchema, type DaySchemaName } from './day';
import { monthSchema, type MonthSchemaName } from './month';
import { seasonSchema, type SeasonSchemaName } from './season';
import { weekSchema, type WeekSchemaName } from './week';
import { weekdaySchema, type WeekdaySchemaName } from './weekday';
import { yearSchema, type YearSchemaName } from './year';

export type Schema =
  | typeof collectionSchema
  | typeof dataNameSchema
  | typeof daySchema
  | typeof monthSchema
  | typeof seasonSchema
  | typeof weekSchema
  | typeof weekdaySchema
  | typeof yearSchema;

export type SchemaName =
  | CollectionSchemaName
  | DataNameSchemaName
  | DaySchemaName
  | MonthSchemaName
  | SeasonSchemaName
  | WeekSchemaName
  | WeekdaySchemaName
  | YearSchemaName;

// export const modelSchemaMap = new Map<SchemaName, Schema>()
//   .set('collection', collectionSchema)
//   .set('dataName', dataNameSchema)
//   .set('day', daySchema)
//   .set('month', monthSchema)
//   .set('season', seasonSchema)
//   .set('week', weekSchema)
//   .set('weekday', weekdaySchema)
//   .set('year', yearSchema);

// export class ModelSchema {
//   static get<T>(schemaName: SchemaName) {
//     const schema = schemaMap.get(schemaName)!;
//     return schema;
//   }
// }
