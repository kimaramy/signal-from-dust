/* eslint-disable react-hooks/exhaustive-deps */
import {
  DependencyList,
  EffectCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"

import useMountEffect from "./useMountEffect"

export default function useUpdateEffect(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  const isMounted = useRef(false)

  const internalDeps = useMemo(() => {
    if (typeof deps !== "undefined" && !Array.isArray(deps)) {
      return [deps]
    } else if (Array.isArray(deps) && deps.length === 0) {
      console.warn(
        "Using [] as the second argument makes 'useUpdateEffect' a noop. The second argument should either be `undefined` or an array of length greater than 0."
      )
    }
    return deps
  }, [deps])

  useEffect(() => {
    if (isMounted.current) {
      effect()
    }
  }, internalDeps)

  useMountEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  })
}
