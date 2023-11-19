'use client';

import { useSearchParams } from 'next/navigation';

/**
 * 단일 쿼리(Query) 파라미터의 값을 읽어와 반환하는 Getter 함수입니다.
 * 동일한 쿼리 파라미터의 값이 1개 이상 존재하거나 fallback 값이 주어진다면 한 개의 값이 보장되는 string[] 타입, 아니라면 undefined를 반환합니다.
 *
 * 참고로, 특정 URL 쿼리 파라미터를 읽어올 경우 반환 값은 string[] | string | undefined 중 하나의 타입입니다.
 * 그래서 값의 유무 혹은 값의 단일 여부를 떠나 예측가능하도록 배열로 변환하여 반환합니다.
 *
 * @param name 쿼리 파라미터 이름
 * @param fallback 쿼리 파라미터가 없을 경우 반환할 fallback 값
 *
 * @returns 쿼리 파라미터 값
 */
function useQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(name: TKey, fallback?: TFallback) {
  const searchParams = useSearchParams();

  const maybeEmptyArray = searchParams.getAll(name) as TValue[]; // 값이 없다면 빈 배열 반환

  const undefinedOrNonEmptyArray =
    maybeEmptyArray.length > 0
      ? maybeEmptyArray
      : fallback
      ? [fallback]
      : undefined;

  return undefinedOrNonEmptyArray as TFallback extends TValue
    ? TValue[]
    : TValue[] | undefined;
}

// export type UseQueryParamReturn<T, K> = T extends K ? K[] : K[] | undefined;

export default useQueryParam;
