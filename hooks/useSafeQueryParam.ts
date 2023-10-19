import { useEffect } from "react"

import useQueryParam from "./useQueryParam"

/**
 * 단일 쿼리 파라미터 값을 안정성 있게 사용하기 위한 Getter 함수입니다.
 * 단, 주어진 validator를 통과하지 못하면 에러를 발생(throw)시키거나, 콘솔에 에러를 출력합니다.
 *
 * @param name 쿼리 파라미터 이름
 * @param fallbackValue 쿼리 파라미터 값이 없을 경우 해당 값에 의존하는 UI를 위한 fallback 값
 * @param options.validator 쿼리 파라미터 값 검증 predicate 함수
 * @param options.errorMessage 유효하지 않을 경우 출력할 에러 메시지
 * @param options.strict true일 경우 에러 throw, false일 경우 console 에러
 *
 * @returns 쿼리 파라미터 값
 */
function useSafeParam<
  V extends string = string,
  K extends string = string,
  FV extends V = V
>(
  name: K,
  fallbackValue: FV | undefined = undefined,
  options: {
    validator: (value: V) => boolean
    errorMessage?: string | ((value: V) => string)
    strict?: boolean
  }
) {
  const { validator, errorMessage, strict = false } = options

  const value = useQueryParam<V, K>(name, fallbackValue)

  useEffect(() => {
    if (!value) return

    if (validator(value)) return

    const _errorMessage =
      typeof errorMessage === "function" ? errorMessage(value) : errorMessage

    if (strict) {
      throw new TypeError(_errorMessage)
    } else {
      console.error(_errorMessage)
    }
  }, [value, validator, errorMessage, strict])

  return value
}

export default useSafeParam
