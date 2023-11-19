'use client';

import { useCallback } from 'react';
import { ReadonlyURLSearchParams } from 'next/navigation';

/**
 * 복수의 쿼리 파라미터 값을 업데이트하기 위한 Setter 함수입니다.
 * 단, Getter 함수인 useQueryParams가 전역 라우터 인스턴스를 구독하고 있으므로 실제 Getter 값 업데이트를 위해서는 useNavigate를 통해 경로 혹은 쿼리 파라미터 변경이 발생해야합니다.
 *
 * @param readonlySearchParams 읽기 전용 URLSearchParams 인스턴스
 * @returns 복수의 쿼리 파라미터 값을 삽입 혹은 업데이트하고 다시 읽기 전용 URLSearchParams를 반환하는 함수
 */
function useSetQueryParams<
  TValue extends string | number | boolean = string,
  TKey extends string = string,
>(readonlySearchParams: ReadonlyURLSearchParams) {
  const setQueryParams = useCallback(
    (map: Map<TKey, TValue>) => {
      const searchParams = new URLSearchParams(
        Array.from(readonlySearchParams.entries())
      );
      for (const [key, value] of map) {
        searchParams.set(key, value.toString());
      }
      return new ReadonlyURLSearchParams(searchParams);
    },
    [readonlySearchParams]
  );

  return setQueryParams;
}

export default useSetQueryParams;
