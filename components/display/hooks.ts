import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

import { displaySchema, type DisplayKey } from './schema';

export function useDisplayKey(
  part?: URLPart,
  initialKey?: DisplayKey
): DisplayKey {
  const [lowerCasedKey] = useEnumUrlParam(
    displaySchema.name,
    displaySchema.lowerCaseKey(initialKey ?? displaySchema.defaultKey),
    {
      enums: displaySchema.mapKeys(displaySchema.lowerCaseKey),
      part,
    }
  );
  return displaySchema.upperCaseKey(lowerCasedKey);
}

export function useSetDisplayKey() {
  const setDisplayKey = useSetQueryParam(displaySchema.name);
  return function (displayKey: DisplayKey) {
    return setDisplayKey(displaySchema.lowerCaseKey(displayKey));
  };
}
