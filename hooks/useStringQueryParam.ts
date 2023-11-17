import useSafeQueryParam from './useSafeQueryParam';

function useStringQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(name: TKey, fallback?: TFallback) {
  return useSafeQueryParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) => values.every((value) => typeof value === 'string'),
    errorMessage: (value) =>
      `Type of '${name}' must be a string. But received ${JSON.stringify(
        value
      )}.`,
  });
}

export default useStringQueryParam;
