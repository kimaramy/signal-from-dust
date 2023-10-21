'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';

import { displayMap, displaySet } from './schema';

export function useDisplayValue() {
  const [display] = useEnumQueryParam(
    QueryParamEnum.Display,
    displaySet,
    displayMap.default
  );
  return display;
}

export function useSetDisplayValue() {
  return useSetQueryParam(QueryParamEnum.Display);
}
