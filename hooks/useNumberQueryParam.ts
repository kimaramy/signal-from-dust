import useSafeQueryParam from './useSafeQueryParam';

function useNumberQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(name: TKey, fallback?: TFallback) {
  return useSafeQueryParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) =>
      values.every((value) => !Number.isNaN(Number(value))),
    errorMessage: (value) =>
      `Type of '${name}' must be a number-like string(ex. '1'). But received ${JSON.stringify(
        value
      )}.`,
  });
}

export default useNumberQueryParam;
