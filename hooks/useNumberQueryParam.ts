import useSafeQueryParam from "./useSafeQueryParam"

function useNumberQueryParam<
  V extends string = string,
  K extends string = string,
  FV extends V = V
>(name: K, fallbackValue?: FV) {
  return useSafeQueryParam<V, K>(name, fallbackValue, {
    strict: true,
    validator: (value) => !Number.isNaN(Number(value)),
    errorMessage: (value) =>
      `Type of '${name}' must be a digit-like string. But received ${JSON.stringify(
        value
      )}.`,
  })
}

export default useNumberQueryParam
