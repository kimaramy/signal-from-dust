import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"

/**
 * 단일 쿼리 파라미터 값을 Upsert하는 Seeter 함수입니다.
 */
function useSetQueryParam<
  TValue extends string = string,
  TKey extends string = string
>(
  name: TKey,
  options?: {
    method: "push" | "replace"
  }
): (value: TValue) => void {
  const router = useRouter()

  const searchParams = useSearchParams()

  const setQueryParam = useCallback(
    (value: TValue) => {
      const mutableSearchParams = new URLSearchParams(
        Array.from(searchParams.entries())
      )
      mutableSearchParams.set(name, value)
      router[options?.method ?? "push"](`?${mutableSearchParams.toString()}`)
    },
    [name, options, router, searchParams]
  )

  return setQueryParam
}

export default useSetQueryParam
