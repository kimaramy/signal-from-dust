import { LocationUtils } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

export function useLocationKey(
  part?: URLPart,
  initialKey?: LocationUtils.Key
): LocationUtils.Key {
  const [lowerCasedKey] = useEnumUrlParam(
    LocationUtils.schema.name,
    LocationUtils.schema.lowerCaseKey(
      initialKey ?? LocationUtils.schema.defaultKey
    ),
    {
      enums: LocationUtils.schema.mapKeys(LocationUtils.schema.lowerCaseKey),
      part,
    }
  );
  return LocationUtils.schema.upperCaseKey(lowerCasedKey);
}

export function useSetLocationKey() {
  const setDataNameKey = useSetQueryParam(LocationUtils.schema.name);
  return function (dataNameKey: LocationUtils.Key) {
    return setDataNameKey(LocationUtils.schema.lowerCaseKey(dataNameKey));
  };
}
