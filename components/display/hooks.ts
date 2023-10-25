'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';

import { Display, displayMap, displaySet } from './schema';

export function useDisplayValue() {
  const [display] = useEnumQueryParam(
    QueryParamEnum.Display,
    [...displaySet],
    displayMap.default
  );
  return display;
}

export function useSetDisplayValue() {
  return useSetQueryParam<Display>(QueryParamEnum.Display);
}
