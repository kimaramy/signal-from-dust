import { useCallback } from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

/**
 * 복수의 쿼리 파라미터 값을 업데이트하기 위한 Setter 함수입니다.
 * 단, Getter 함수인 useQueryParams가 전역 라우터 인스턴스를 구독하고 있으므로 실제 Getter 값 업데이트를 위해서는 useNavigate를 통해 경로 혹은 쿼리 파라미터 변경이 발생해야합니다.
 *
 * @returns 복수의 쿼리 파라미터 값을 삽입 혹은 업데이트하고 읽기 전용 URLSearchParams 인스턴스를 반환하거나, 옵션에 따라 쿼리 문자열로 변환 후 반환하는 함수
 */
export function useSetQueryParams<
  TValue extends string | number | boolean = string,
  TKey extends string = string,
>() {
  const oldReadonlyURLSearchParams = useSearchParams();

  const setQueryParams = useCallback(
    <TStringified extends boolean = false>(
      map: Map<TKey, TValue>,
      options?: {
        stringify: TStringified;
      }
    ) => {
      const newURLSearchParams = new URLSearchParams(
        Array.from(oldReadonlyURLSearchParams.entries())
      );
      for (const [key, value] of map) {
        newURLSearchParams.set(key, value.toString());
      }
      const newReadonlyURLSearchParams = new ReadonlyURLSearchParams(
        newURLSearchParams
      );
      const maybeSearch = options?.stringify
        ? `?${newReadonlyURLSearchParams.toString()}` // URLSearchParams.toString() has no '?' prefix
        : newReadonlyURLSearchParams;
      return maybeSearch as TStringified extends true
        ? `?${string}`
        : ReadonlyURLSearchParams;
    },
    [oldReadonlyURLSearchParams]
  );

  return setQueryParams;
}

/**
 * 단일 쿼리 파라미터의 값을 업데이트하기 위한 Setter 함수입니다.
 * 단, Getter 함수인 useQueryParam가 전역 라우터 인스턴스를 구독하고 있으므로 실제 Getter 값 업데이트를 위해서는 useNavigate를 통해 경로 혹은 쿼리 파라미터 변경이 발생해야합니다.
 *
 * @param name 변경할 쿼리 파라미터 이름
 * @returns 단일 쿼리 파라미터 값을 삽입 혹은 업데이트하고 읽기 전용 URLSearchParams 인스턴스를 반환하거나, 옵션에 따라 쿼리 문자열로 변환 후 반환하는 함수
 */
export function useSetQueryParam<
  TValue extends string | number | boolean = string,
  TKey extends string = string,
>(name: TKey) {
  const oldReadonlyURLSearchParams = useSearchParams();

  const setQueryParam = useCallback(
    <TStringified extends boolean = false>(
      value: TValue,
      options?: {
        stringify: TStringified;
      }
    ) => {
      const newURLSearchParams = new URLSearchParams(
        Array.from(oldReadonlyURLSearchParams.entries())
      );
      newURLSearchParams.set(name, value.toString());
      const newReadonlyURLSearchParams = new ReadonlyURLSearchParams(
        newURLSearchParams
      );
      const maybeStringified = options?.stringify
        ? `?${newReadonlyURLSearchParams.toString()}`
        : newReadonlyURLSearchParams;
      return maybeStringified as TStringified extends true
        ? `?${string}`
        : ReadonlyURLSearchParams;
    },
    [oldReadonlyURLSearchParams, name]
  );

  return setQueryParam;
}
