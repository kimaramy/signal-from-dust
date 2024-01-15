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
  const setDustKey = useSetQueryParam(LocationUtils.schema.name);
  return function (dustKey: LocationUtils.Key) {
    return setDustKey(LocationUtils.schema.lowerCaseKey(dustKey));
  };
}
