import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"

/**
 * 단일 쿼리 파라미터 값을 Upsert하는 Seeter 함수입니다.
 */
function useSetQueryParam<V extends string = string, K extends string = string>(
  name: K,
  options?: {
    method: "push" | "replace"
  }
): (value: V) => void {
  const router = useRouter()

  const searchParams = useSearchParams()

  const setQueryParam = useCallback(
    (value: V) => {
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
