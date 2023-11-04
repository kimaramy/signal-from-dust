import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * 복수의 쿼리 파라미터 값을 Upsert하는 Setter 함수입니다.
 */
function useSetQueryParams(options?: { method: 'push' | 'replace' }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const setQueryParams = useCallback(
    (map: Map<string, string | number | boolean>) => {
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
