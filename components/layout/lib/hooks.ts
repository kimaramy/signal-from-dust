'use client';

import { useCallback, useContext, useState } from 'react';

import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

import {
  LayoutContext,
  LayoutContextError,
  type LayoutContextValue,
} from './contexts';
import { LayoutUtils } from './schemes';

export function useLayoutKey(
  part?: URLPart,
  initialKey?: LayoutUtils.Key
): LayoutUtils.Key {
  const [lowerCasedKey] = useEnumUrlParam(
    LayoutUtils.schema.name,
    LayoutUtils.schema.lowerCaseKey(
      initialKey ?? LayoutUtils.schema.defaultKey
    ),
    {
      enums: LayoutUtils.schema.mapKeys(LayoutUtils.schema.lowerCaseKey),
      part,
    }
  );
  return LayoutUtils.schema.upperCaseKey(lowerCasedKey);
}

export function useSetLayoutKey() {
  const setLayoutKey = useSetQueryParam(LayoutUtils.schema.name);
  return function (layoutKey: LayoutUtils.Key) {
    return setLayoutKey(LayoutUtils.schema.lowerCaseKey(layoutKey));
  };
}

export function useLayoutState(
  initialKey: LayoutUtils.Key
): LayoutContextValue {
  const [key, _setKey] = useState(initialKey);
  const value = LayoutUtils.schema.getValue(key);
  const setKey = useCallback((key: LayoutUtils.Key) => _setKey(key), []);
  return { key, value, setKey };
}

export function useLayoutContext() {
  const layoutContext = useContext(LayoutContext);
  if (!layoutContext) {
    throw LayoutContextError(useLayoutContext.name);
  }
  return layoutContext;
}
