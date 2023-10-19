import useSafeQueryParam from "./useSafeQueryParam"

function useEnumQueryParam<
  V extends string = string,
  K extends string = string,
  FV extends V = V
>(name: K, enums: V[], fallbackValue?: FV) {
  return useSafeQueryParam<V, K>(name, fallbackValue, {
    strict: true,
    validator: (value) => enums.includes(value),
    errorMessage: (value) =>
      `'${value}'(the value of '${name}') is not included in the ${JSON.stringify(
        enums
      )}`,
  })
}

export default useEnumQueryParam
