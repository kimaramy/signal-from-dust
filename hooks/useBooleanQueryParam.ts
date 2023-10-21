import useSafeQueryParam from './useSafeQueryParam';

function useBooleanQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallbackValue extends TValue = TValue,
>(name: TKey, fallbackValue: TFallbackValue) {
  return useSafeQueryParam<TValue, TKey, TFallbackValue>(name, fallbackValue, {
    strict: true,
    validator: (values) =>
      values.every((value) => value === 'true' || value === 'false'),
    errorMessage: (value) =>
      `Type of '${name}' must be a boolean-like string. But received ${JSON.stringify(
        value
      )}.`,
  });
}

export default useBooleanQueryParam;
