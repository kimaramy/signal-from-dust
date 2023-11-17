'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * 복수의 쿼리 파라미터 값을 변경하는 Setter 함수입니다.
 */
function useSetQueryParams<
  TValue extends string | number | boolean,
  TKey extends string = string,
>(options?: { method: 'push' | 'replace' }) {
  const router = useRouter();

  const searchParams = useSearchParams(); // 'next/navigation' 내부적으로 useContext(SearchParamsContext) 값을 반환

  const setQueryParams = useCallback(
    (map: Map<TKey, TValue>) => {
      const mutableSearchParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );
      for (const [key, value] of map.entries()) {
        mutableSearchParams.set(key, value.toString());
      }
      router[options?.method ?? 'push'](`?${mutableSearchParams.toString()}`);
    },
    [options, router, searchParams]
  );

  return setQueryParams;
}

export default useSetQueryParams;
