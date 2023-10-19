import useSafeQueryParam from "./useSafeQueryParam"

function useBooleanQueryParam<
  V extends string = string,
  K extends string = string,
  FV extends V = V
>(name: K, fallbackValue?: FV) {
  return useSafeQueryParam<V, K>(name, fallbackValue, {
    strict: true,
    validator: (value) => value === "true" || value === "false",
    errorMessage: (value) =>
      `Type of '${name}' must be a boolean-like string. But received ${JSON.stringify(
        value
      )}.`,
  })
}

export default useBooleanQueryParam
