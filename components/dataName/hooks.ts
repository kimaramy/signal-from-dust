import { DataNameUtils } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

export function useDataNameKey(
  part?: URLPart,
  initialKey?: DataNameUtils.Key
): DataNameUtils.Key {
  const [lowerCasedKey] = useEnumUrlParam(
    DataNameUtils.schema.name,
    DataNameUtils.schema.lowerCaseKey(
      initialKey ?? DataNameUtils.schema.defaultKey
    ),
    {
      enums: DataNameUtils.schema.mapKeys(DataNameUtils.schema.lowerCaseKey),
      part,
    }
  );
  return DataNameUtils.schema.upperCaseKey(lowerCasedKey);
}

export function useSetDataNameKey() {
  const setDataNameKey = useSetQueryParam(DataNameUtils.schema.name);
  return function (dataNameKey: DataNameUtils.Key) {
    return setDataNameKey(DataNameUtils.schema.lowerCaseKey(dataNameKey));
  };
}
