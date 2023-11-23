import useSafeQueryParam from './useSafeQueryParam';

function isStringifiedBoolean(value: string) {
  return value === 'true' || value === 'false';
}

function useBooleanQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(name: TKey, fallback?: TFallback) {
  return useSafeQueryParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) => values.every((value) => isStringifiedBoolean(value)),
    errorMessage: (value) =>
      `Type of '${name}' must be a stringified boolean format(ex. 'true'). But received ${JSON.stringify(
        value
      )}.`,
  });
}

export { isStringifiedBoolean };

export default useBooleanQueryParam;
