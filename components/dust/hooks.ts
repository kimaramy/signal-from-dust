import { DustUtils } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

export function useDustKey(
  part?: URLPart,
  initialKey?: DustUtils.Key
): DustUtils.Key {
  const [lowerCasedKey] = useEnumUrlParam(
    DustUtils.schema.name,
    DustUtils.schema.lowerCaseKey(initialKey ?? DustUtils.schema.defaultKey),
    {
      enums: DustUtils.schema.mapKeys(DustUtils.schema.lowerCaseKey),
      part,
    }
  );
  return DustUtils.schema.upperCaseKey(lowerCasedKey);
}

export function useSetDustKey() {
  const setDustKey = useSetQueryParam(DustUtils.schema.name);
  return function (dustKey: DustUtils.Key) {
    return setDustKey(DustUtils.schema.lowerCaseKey(dustKey));
  };
}
