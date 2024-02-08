'use client';

import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import type { TypedRoute } from '../types';
import {
  useWriteQueryParams,
  type UseWriteQueryParamsReturn,
} from './_useWriteQueryParams';
import useNavigate from './useNavigate';

/**
 * 단일 쿼리 파라미터의 값을 업데이트하기 위한 Setter 함수입니다.
 * 단, Getter 함수인 useQueryParam가 전역 라우터 인스턴스를 구독하고 있으므로 실제 Getter 값 업데이트를 위해서는 useNavigate를 통해 URL 변경(경로 혹은 쿼리 파라미터 변경)이 발생해야합니다.
 *
 * @param name 변경할 쿼리 파라미터 이름
 * @returns 단일 쿼리 파라미터 값을 삽입(혹은 오버라이드)된 읽기 전용 URLSearchParams 인스턴스를 반환 혹은 옵션에 따라 쿼리 문자열로 변환 후 반환하는 업데이트 함수
 */
export function useSetQueryParam<
  TValue extends string | number | boolean = string,
  TKey extends string = string,
>(name: TKey) {
  const writeQueryParams = useWriteQueryParams();

  const setQueryParam = useCallback(
    <T extends boolean = false>(
      value: TValue,
      formatOptions?: Parameters<typeof writeQueryParams<T>>[1]
    ): UseWriteQueryParamsReturn<T> =>
      writeQueryParams<T>((oldReadonlyURLSearchParams) => {
        const newURLSearchParams = new URLSearchParams(
          Array.from(oldReadonlyURLSearchParams.entries())
        );
        newURLSearchParams.set(name, value.toString());
        return newURLSearchParams;
      }, formatOptions),
    [writeQueryParams, name]
  );

  return setQueryParam;
}

/**
 * 복수의 쿼리 파라미터 값을 업데이트하기 위한 Setter 함수입니다.
 * 단, Getter 함수인 useQueryParams가 전역 라우터 인스턴스를 구독하고 있으므로 실제 Getter 값 업데이트를 위해서는 useNavigate를 통해 URL 변경(경로 혹은 쿼리 파라미터 변경)이 발생해야합니다.
 *
 * @returns 복수의 쿼리 파라미터 값들이 삽입된 읽기 전용 URLSearchParams 인스턴스를 반환 혹은 옵션에 따라 쿼리 문자열로 변환 후 반환하는 업데이트 함수
 */
export function useSetQueryParams<
  TValue extends string | number | boolean = string,
  TKey extends string = string,
>() {
  const writeQueryParams = useWriteQueryParams();

  const setQueryParams = useCallback(
    <T extends boolean = false>(
      map: Map<TKey, TValue>,
      formatOptions?: Parameters<typeof writeQueryParams<T>>[1]
    ): UseWriteQueryParamsReturn<T> =>
      writeQueryParams<T>(() => {
        const newURLSearchParams = new URLSearchParams();
        for (const [key, value] of map) {
          newURLSearchParams.set(key, value.toString());
        }
        return newURLSearchParams;
      }, formatOptions),
    [writeQueryParams]
  );

  return setQueryParams;
}

/**
 * 주어진 이름 목록의 쿼리 파라미터만 선택(pick)하거나 제외(omit)하기 위한 필터 함수입니다.
 *
 * @param options.names 필터할 쿼리 파라미터 이름 목록
 * @param options.method 필터 방식
 * @returns 필터가 적용된 읽기 전용 URLSearchParams 인스턴스를 반환 혹은 옵션에 따라 쿼리 문자열로 변환 후 반환하는 필터 함수
 */
export function useFilterQueryParams(options: {
  names: string[];
  method: 'pick' | 'omit';
}) {
  const writeQueryParams = useWriteQueryParams();

  const filterQueryParams = useCallback(
    <T extends boolean = false>(
      formatOptions?: Parameters<typeof writeQueryParams<T>>[1]
    ): UseWriteQueryParamsReturn<T> =>
      writeQueryParams<T>((oldReadonlyURLSearchParams) => {
        // when method is 'pick'
        if (options.method === 'pick') {
          const newURLSearchParams = new URLSearchParams();
          options.names.forEach((name) => {
            const value = oldReadonlyURLSearchParams.get(name);
            if (value) newURLSearchParams.set(name, value);
          });
          return newURLSearchParams;
        }
        // when method is 'omit'
        const newURLSearchParams = new URLSearchParams(
          Array.from(oldReadonlyURLSearchParams.entries())
        );
        options.names.forEach((name) => {
          newURLSearchParams.delete(name);
        });
        return newURLSearchParams;
      }, formatOptions),
    [writeQueryParams, options]
  );

  return filterQueryParams;
}

export function useFilterQueryParamsEffect(
  options: Parameters<typeof useFilterQueryParams>[0]
) {
  const navigate = useNavigate();

  const pathname = usePathname();

  const filterQueryParams = useFilterQueryParams(options);

  useEffect(() => {
    const search = filterQueryParams({ stringify: true });

    const href = (
      search.endsWith('?') ? pathname : `${pathname}${search}`
    ) as TypedRoute;

    navigate(href, { method: 'replace' });
  }, []);
}

export function useClearQueryParamsEffect() {
  const navigate = useNavigate();

  const pathname = usePathname();

  useEffect(() => {
    navigate(pathname as TypedRoute, { method: 'replace' });
  }, []);
}
