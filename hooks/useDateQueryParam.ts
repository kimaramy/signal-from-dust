import useSafeQueryParam from './useSafeQueryParam';

function useDateQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallbackValue extends TValue = TValue
>(name: TKey, fallbackValue: TFallbackValue) {
  return useSafeQueryParam<TValue, TKey, TFallbackValue>(name, fallbackValue, {
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
