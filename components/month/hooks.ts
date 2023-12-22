import { monthSchema, type MonthKey } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

export function useMonthKey(part?: URLPart, initialKey?: MonthKey): MonthKey {
  const [lowerCasedKey] = useEnumUrlParam(
    monthSchema.name,
    monthSchema.lowerCaseKey(initialKey ?? monthSchema.defaultKey),
    {
      enums: monthSchema.mapKeys(monthSchema.lowerCaseKey),
      part,
    }
  );
  return monthSchema.upperCaseKey(lowerCasedKey);
}

export function useMonthValue() {
  const monthKey = useMonthKey();
  return monthSchema.getValue(monthKey);
}

export function useSetMonthKey() {
  const setMonthKey = useSetQueryParam(monthSchema.name);
  return function (monthKey: MonthKey) {
    return setMonthKey(monthSchema.lowerCaseKey(monthKey));
  };
}
