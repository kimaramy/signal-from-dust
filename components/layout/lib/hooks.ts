import { useContext } from 'react';

import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

import { LayoutContext, LayoutContextError } from './context';
import { LayoutUtils } from './schema';

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

export function useLayoutContext() {
  const layoutContext = useContext(LayoutContext);
  if (!layoutContext) {
    throw LayoutContextError(useLayoutContext.name);
  }
  return layoutContext;
}
