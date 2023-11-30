'use client';

import { useParams } from 'next/navigation';

import type { UseUrlParam } from './useUrlParam';

/**
 * 단일 경로(Path) 파라미터의 값을 읽어와 반환하는 Getter 함수입니다.
 * 동일한 경로 파라미터의 값이 1개 이상 존재하거나 fallback 값이 주어진다면 한 개의 값이 보장되는 string[] 타입, 아니라면 undefined를 반환합니다.
 *
 * 참고로, 특정 경로 파라미터를 읽어올 경우 반환 값은 string[] | string | undefined 중 하나의 타입입니다.
 * 예) [...slugs] → string[], [slug] → string
 * 그래서 값의 유무 혹은 값의 단일 여부를 떠나 예측가능하도록 배열로 변환하여 반환합니다.
 *
 * @param name 경로 파라미터 이름
 * @param fallback 경로 파라미터가 없을 경우 반환할 fallback 값
 *
 * @returns 경로 파라미터 값
 */
function usePathParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(...args: Parameters<UseUrlParam<TValue, TKey, TFallback>>) {
  const [name, fallback] = args;

  const params = useParams();

  /**
   * 먼저, useParams 반환 타입은 다음과 같습니다.
   * ```
   * interface Params { [key: string]: string | string[]; }
   * ```
   * 하지만 접근하려는 경로가 존재하지 않을 경우 undefined를 반환해야하나, Next.js 측의 의도적 타이핑이 아니라면 오류로 보입니다.
   * 그래서 접근 값에 undefined를 병합해줍니다.
   */
  const maybeArrayOrUndefined: string[] | string | undefined =
    params[name] || undefined; // 빈 문자열('') 확률 배제

  const maybeEmptyArray = Array.isArray(maybeArrayOrUndefined)
    ? maybeArrayOrUndefined
    : maybeArrayOrUndefined
    ? [maybeArrayOrUndefined]
    : [];

  const undefinedOrNonEmptyArray =
    maybeEmptyArray.length > 0
      ? maybeEmptyArray
      : fallback
      ? [fallback]
      : undefined;

  return undefinedOrNonEmptyArray as ReturnType<
    UseUrlParam<TValue, TKey, TFallback>
  >;
}

export default usePathParam;
