import { dataNameSchema, type DataNameKey } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

export function useDataNameKey(
  part?: URLPart,
  initialKey?: DataNameKey
): DataNameKey {
  const [lowerCasedKey] = useEnumUrlParam(
    dataNameSchema.name,
    dataNameSchema.lowerCaseKey(initialKey ?? dataNameSchema.defaultKey),
    {
      enums: dataNameSchema.mapKeys(dataNameSchema.lowerCaseKey),
      part,
    }
  );
  return dataNameSchema.upperCaseKey(lowerCasedKey);
}

export function useSetDataNameKey() {
  const setDataNameKey = useSetQueryParam(dataNameSchema.name);
  return function (dataNameKey: DataNameKey) {
    return setDataNameKey(dataNameSchema.lowerCaseKey(dataNameKey));
  };
}
