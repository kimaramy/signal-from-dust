import useSafeQueryParam from './useSafeQueryParam';

function useDateQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(name: TKey, fallback?: TFallback) {
  return useSafeQueryParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) =>
      values.every((value) => !Number.isNaN(Date.parse(value))),
    errorMessage: (value) =>
      `Type of '${name}' must be a date-like string. But received ${JSON.stringify(
        value
      )}.`,
  });
}

export default useDateQueryParam;
