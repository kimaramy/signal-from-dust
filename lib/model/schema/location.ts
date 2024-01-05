import { z } from 'zod';

import { MapSchema } from './base';
import { LocaleSchema } from './locale';

const locationSchemaName = 'location';

const locationKeys = ['SEOUL'] as const;

const locationKeySchema = z.enum(locationKeys);

type LocationSchemaName = typeof locationSchemaName;

type LocationKey = z.infer<typeof locationKeySchema>;

type LocationValue = {
  index: number;
  name: LocationKey;
  latitude: string;
  longitude: string;
  i18n: {
    en: string;
    ko: string;
  };
};

const valueSet: LocationValue[] = [
  {
    index: 0,
    name: 'SEOUL',
    latitude: '37.564214',
    longitude: '127.001699',
    i18n: {
      en: 'Seoul',
      ko: '서울',
    },
  },
];

const locationMap = new Map(
  locationKeys.map((locationKey, index) => [
    locationKey,
    valueSet.find((value) => value.index === index)!,
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
