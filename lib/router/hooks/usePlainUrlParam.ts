import { isStringifiedBoolean } from './useBooleanUrlParam';
import { isStringifiedDate } from './useDateUrlParam';
import { isStringifiedNumber } from './useNumberUrlParam';
import useSafeUrlParam from './useSafeUrlParam';

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

export function usePlainPathParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(name: TKey, fallback?: TFallback) {
  return useSafeUrlParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    strategy: 'path',
    validator: (values) => values.every((value) => isPlainString(value)),
    errorMessage: (value) =>
      `Type of '${name}' must be a plain string - it can't be a stringified date/number/boolean format. But received ${JSON.stringify(
        value
      )}.`,
  });
}

export function usePlainQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(name: TKey, fallback?: TFallback) {
  return useSafeUrlParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    strategy: 'query',
    validator: (values) => values.every((value) => isPlainString(value)),
    errorMessage: (value) =>
      `Type of '${name}' must be a plain string - it can't be a stringified date/number/boolean format. But received ${JSON.stringify(
        value
      )}.`,
  });
}
