import useSafeQueryParam from './useSafeQueryParam';

function useEnumQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(name: TKey, enums: TValue[], fallback?: TFallback) {
  return useSafeQueryParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) => values.every((value) => enums.includes(value)),
    errorMessage: (value) =>
      `'${value}'(the value of '${name}') is not included in the ${JSON.stringify(
        enums
      )}`,
  });
}

export default useEnumQueryParam;
