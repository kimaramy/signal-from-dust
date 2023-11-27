import useSafeQueryParam from './useSafeQueryParam';

function isStringifiedDate(value: string) {
  return !Number.isNaN(Date.parse(value));
}

function useDateQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(name: TKey, fallback?: TFallback) {
  return useSafeQueryParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) => values.every((value) => isStringifiedDate(value)),
    errorMessage: (value) =>
      `Type of '${name}' must be a stringified date format(ex. '2023-09-01'). But received ${JSON.stringify(
        value
      )}.`,
  });
}

export { isStringifiedDate };

export default useDateQueryParam;
