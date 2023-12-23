import { AppMonth } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

export function useMonthKey(
  part?: URLPart,
  initialKey?: AppMonth.Key
): AppMonth.Key {
  const [lowerCasedKey] = useEnumUrlParam(
    AppMonth.schema.name,
    AppMonth.schema.lowerCaseKey(initialKey ?? AppMonth.schema.defaultKey),
    {
      enums: AppMonth.schema.mapKeys(AppMonth.schema.lowerCaseKey),
      part,
    }
  );
  return AppMonth.schema.upperCaseKey(lowerCasedKey);
}

export function useMonthValue() {
  const monthKey = useMonthKey();
  return AppMonth.schema.getValue(monthKey);
}

export function useSetMonthKey() {
  const setMonthKey = useSetQueryParam(AppMonth.schema.name);
  return function (monthKey: AppMonth.Key) {
    return setMonthKey(AppMonth.schema.lowerCaseKey(monthKey));
  };
}
