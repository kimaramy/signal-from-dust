'use client';

import { useEnumQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';

import { DustSize, dustSizeMap, dustSizeSet } from './schema';

export function useDustSizeValue() {
  const [dustSize] = useEnumQueryParam(
    QueryParamEnum.DustSize,
    [...dustSizeSet],
    dustSizeMap.default
  );
  return dustSize;
}

export function useSetDustSizeValue() {
  return useSetQueryParam<DustSize>(QueryParamEnum.DustSize);
}
