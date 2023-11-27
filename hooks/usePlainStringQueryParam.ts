import { isStringifiedBoolean } from './useBooleanQueryParam';
import { isStringifiedDate } from './useDateQueryParam';
import { isStringifiedNumber } from './useNumberQueryParam';
import useSafeQueryParam from './useSafeQueryParam';

function isEmptyString(value: string) {
  return value === '';
}

function isPlainString(value: string) {
  return (
    !isStringifiedNumber(value) &&
    !isStringifiedDate(value) &&
    !isStringifiedBoolean(value)
  );
}

function usePlainStringQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(name: TKey, fallback?: TFallback) {
  return useSafeQueryParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) => values.every((value) => isPlainString(value)),
    errorMessage: (value) =>
      `Type of '${name}' must be a plain string - it can't be a stringified date/number/boolean format. But received ${JSON.stringify(
        value
      )}.`,
  });
}

export { isPlainString, isEmptyString };

export default usePlainStringQueryParam;
