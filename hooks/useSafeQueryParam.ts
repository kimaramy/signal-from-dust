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
  TValue extends string = string,
  TKey extends string = string,
  TFallbackValue extends TValue = TValue
>(
  name: TKey,
  fallbackValue: TFallbackValue,
  options: {
    validator: (value: TValue[]) => boolean
    errorMessage?: string | ((value: TValue[]) => string)
    strict?: boolean
  }
) {
  const { validator, errorMessage, strict = false } = options

  const values = useQueryParam<TValue, TKey, TFallbackValue>(
    name,
    fallbackValue
  )

  useEffect(() => {
    if (!values) return

    if (validator(values)) return

    const _errorMessage =
      typeof errorMessage === "function" ? errorMessage(values) : errorMessage

    if (strict) {
      throw new TypeError(_errorMessage)
    } else {
      console.error(_errorMessage)
    }
  }, [values, validator, errorMessage, strict])

  return values
}

export default useSafeParam
