import useSafeQueryParam from "./useSafeQueryParam"

function useNumberQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallbackValue extends TValue = TValue
>(name: TKey, fallbackValue: TFallbackValue) {
  return useSafeQueryParam<TValue, TKey, TFallbackValue>(name, fallbackValue, {
    strict: true,
    validator: (values) =>
      values.every((value) => !Number.isNaN(Number(value))),
    errorMessage: (value) =>
      `Type of '${name}' must be a digit-like string. But received ${JSON.stringify(
        value
      )}.`,
  })
}

export default useNumberQueryParam
