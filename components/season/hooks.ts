'use client';

import { useSearchParams } from 'next/navigation';

import { seasonSchema, type SeasonKey, type SeasonValue } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

export function useSeasonKey(initialKey?: SeasonKey): SeasonKey {
  const lowerCasedKeys = seasonSchema.mapKeys(seasonSchema.lowerCaseKey);
  const lowerCasedDefaultKey = seasonSchema.lowerCaseKey(
    initialKey ?? seasonSchema.defaultKey
  );
  const [lowerCasedKey] = useEnumUrlParam(
    QueryParamEnum.Season,
    lowerCasedDefaultKey,
    { enums: lowerCasedKeys, part: 'query' }
  );
  return seasonSchema.upperCaseKey(lowerCasedKey);
}

export function useSeasonValue(): SeasonValue {
  const seasonKey = useSeasonKey();
  return seasonSchema.getValue(seasonKey);
}

export function useSetSeasonKey() {
  const setSeasonKey = useSetQueryParam(
    useSearchParams(),
    QueryParamEnum.Season
  );
  return function (seasonKey: SeasonKey) {
    const lowerCasedKey = seasonSchema.lowerCaseKey(seasonKey);
    return setSeasonKey(lowerCasedKey);
  };
}
