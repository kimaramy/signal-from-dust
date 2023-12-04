import { isStringifiedBoolean } from './useBooleanUrlParam';
import { isStringifiedDate } from './useDateUrlParam';
import { isStringifiedNumber } from './useNumberUrlParam';
import useUrlParam, { type UseUrlParamOptions } from './useUrlParam';

export function isEmptyString(value: string) {
  return value === '';
}

export function isPlainString(value: string) {
  return (
    !isStringifiedNumber(value) &&
    !isStringifiedDate(value) &&
    !isStringifiedBoolean(value)
  );
}

export const getPlainErrorMessage = (name: string, value: string) =>
  `Type of '${name}' must be a plain string - it can't be a stringified date/number/boolean format. But received ${value}.`;

export default function usePlainUrlParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(
  name: TKey,
  fallback: TFallback | undefined,
  options?: Pick<UseUrlParamOptions<TValue>, 'part'>
) {
  return useUrlParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) => values.every((value) => isPlainString(value)),
    errorMessage: (value) => getPlainErrorMessage(name, JSON.stringify(value)),
    part: options?.part,
  });
}
