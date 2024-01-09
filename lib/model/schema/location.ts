import { z } from 'zod';

import { MapSchema, type MapValue } from './base';
import { LocaleSchema } from './locale';

const locationSchemaName = 'location';

const locationKeys = ['SEOUL'] as const;

const locationKeySchema = z.enum(locationKeys);

type LocationSchemaName = typeof locationSchemaName;

type LocationKey = z.infer<typeof locationKeySchema>;

type LocationValue = MapValue<LocationKey> & {
  latitude: string;
  longitude: string;
};

const locationValues: ReadonlyArray<LocationValue> = [
  {
    name: 'SEOUL',
    latitude: '37.564214',
    longitude: '127.001699',
    order: 0,
    i18n: {
      en: 'Seoul',
      ko: '서울',
    },
  },
];

const locationMap = new Map(
  locationKeys.map((locationKey) => [
    locationKey,
    locationValues.find((value) => value.name === locationKey)!,
  ])
);

class LocationSchema extends MapSchema<
  LocationSchemaName,
  LocationKey,
  LocationValue
> {
  constructor() {
    super(
      locationSchemaName,
      locationMap,
      locationKeySchema,
      locationKeySchema.enum.SEOUL
    );
  }
  display(locationKey: LocationKey, locale = LocaleSchema.defaultLocale) {
    return this.getValue(locationKey)['i18n'][locale];
  }
}

const locationSchema = new LocationSchema();

export namespace LocationUtils {
  export type Key = LocationKey;
  export type Value = LocationValue;
  export type SchemaName = LocationSchemaName;
  export const schema = locationSchema;
}
