'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';

import { Season, seasonMap, seasonSet } from './schema';

export function useSeasonValue() {
  const [season] = useEnumQueryParam(
    QueryParamEnum.Season,
    [...seasonSet],
    seasonMap.Default
  );
  return season;
}

export function useSetSeasonValue() {
  return useSetQueryParam<Season>(QueryParamEnum.Season);
}
