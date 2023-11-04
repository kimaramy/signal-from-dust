'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';
import { toLower, toUpper } from 'lodash-es';

import { QueryParamEnum } from '@/lib/utils';

import { seasonSchema, type SeasonKey, type SeasonValue } from './schema';

export function useSeasonKey(): SeasonKey {
  const lowerCasedKeys = seasonSchema
    .getAllKeys()
    .map((key) => toLower(key) as Lowercase<SeasonKey>);

  const lowerCasedDefaultKey = toLower(
    seasonSchema.getDefaultKey()
  ) as Lowercase<SeasonKey>;

  const [lowerCasedKey] = useEnumQueryParam(
    QueryParamEnum.Season,
    lowerCasedKeys,
    lowerCasedDefaultKey
  );

  return toUpper(lowerCasedKey) as SeasonKey;
}

export function useSeasonValue(): SeasonValue {
  const seasonKey = useSeasonKey();
  return seasonSchema.getValue(seasonKey);
}

export function useSetSeasonKey() {
  const setSeasonKey = useSetQueryParam<Lowercase<SeasonKey>>(
    QueryParamEnum.Season
  );
  return function (seasonKey: SeasonKey) {
    const lowerCasedKey = toLower(seasonKey) as Lowercase<SeasonKey>;
    setSeasonKey(lowerCasedKey);
  };
}
