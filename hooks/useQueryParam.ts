import { useSearchParams } from "next/navigation"

/**
 * 단일 쿼리 파라미터 값을 읽어와 반환하는 Getter 함수입니다.
 *
 * @param name 쿼리 파라미터 이름
 * @param fallbackValue 쿼리 파라미터 값이 없을 경우 해당 값에 의존하는 UI를 위한 fallback 값
 *
 * @returns 쿼리 파라미터 값
 */
function useQueryParam<
  V extends string = string,
  K extends string = string,
  FV extends V = V
>(name: K, fallbackValue?: FV) {
  const searchParams = useSearchParams()

  const value = searchParams.get(name)

  return (value as V) ?? fallbackValue
}

export default useQueryParam
