import { AppDataName } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

export function useDataNameKey(
  part?: URLPart,
  initialKey?: AppDataName.Key
): AppDataName.Key {
  const [lowerCasedKey] = useEnumUrlParam(
    AppDataName.schema.name,
    AppDataName.schema.lowerCaseKey(
      initialKey ?? AppDataName.schema.defaultKey
    ),
    {
      enums: AppDataName.schema.mapKeys(AppDataName.schema.lowerCaseKey),
      part,
    }
  );
  return AppDataName.schema.upperCaseKey(lowerCasedKey);
}

export function useSetDataNameKey() {
  const setDataNameKey = useSetQueryParam(AppDataName.schema.name);
  return function (dataNameKey: AppDataName.Key) {
    return setDataNameKey(AppDataName.schema.lowerCaseKey(dataNameKey));
  };
}
