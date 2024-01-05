import { MonthUtils } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

export function useMonthKey(
  part?: URLPart,
  initialKey?: MonthUtils.Key
): MonthUtils.Key {
  const [lowerCasedKey] = useEnumUrlParam(
    MonthUtils.schema.name,
    MonthUtils.schema.lowerCaseKey(initialKey ?? MonthUtils.schema.defaultKey),
    {
      enums: MonthUtils.schema.mapKeys(MonthUtils.schema.lowerCaseKey),
      part,
    }
  );
  return MonthUtils.schema.upperCaseKey(lowerCasedKey);
}

export function useMonthValue() {
  const monthKey = useMonthKey();
  return MonthUtils.schema.getValue(monthKey);
}

export function useSetMonthKey() {
  const setMonthKey = useSetQueryParam(MonthUtils.schema.name);
  return function (monthKey: MonthUtils.Key) {
    return setMonthKey(MonthUtils.schema.lowerCaseKey(monthKey));
  };
}
