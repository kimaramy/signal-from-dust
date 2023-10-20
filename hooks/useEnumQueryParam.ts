import useSafeQueryParam from "./useSafeQueryParam"

function useEnumQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallbackValue extends TValue = TValue
>(name: TKey, enums: TValue[], fallbackValue: TFallbackValue) {
  return useSafeQueryParam<TValue, TKey, TFallbackValue>(name, fallbackValue, {
    strict: true,
    validator: (values) => values.every((value) => enums.includes(value)),
    errorMessage: (value) =>
      `'${value}'(the value of '${name}') is not included in the ${JSON.stringify(
        enums
      )}`,
  })
}

export default useEnumQueryParam
