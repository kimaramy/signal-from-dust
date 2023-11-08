'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum, toLowerCase, toUpperCase } from '@/lib/utils';

import { seasonSchema, type SeasonKey, type SeasonValue } from './schema';

export function useSeasonKey(): SeasonKey {
  const lowerCasedKeys = seasonSchema.getAllKeys().map(toLowerCase);
  const lowerCasedDefaultKey = toLowerCase(seasonSchema.defaultKey);
  const [lowerCasedKey] = useEnumQueryParam(
    QueryParamEnum.Season,
    lowerCasedKeys,
    lowerCasedDefaultKey
  );
  return toUpperCase(lowerCasedKey);
}

export function useSeasonValue(): SeasonValue {
  const seasonKey = useSeasonKey();
  return seasonSchema.getValue(seasonKey);
}

export function useSetSeasonKey() {
  const setSeasonKey = useSetQueryParam(QueryParamEnum.Season);
  return function (seasonKey: SeasonKey) {
    const lowerCasedKey = toLowerCase(seasonKey);
    setSeasonKey(lowerCasedKey);
  };
}
