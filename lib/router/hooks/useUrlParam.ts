'use client';

import { useEffect } from 'react';

import useUnsafeUrlParam, { type URLPart } from './_useUnsafeUrlParam';

interface UseUrlParamOptions<TValue> {
  validator: (values: TValue[]) => boolean;
  errorMessage?: string | ((values: TValue[]) => string);
  part?: URLPart;
  strict?: boolean;
}

/**
 * 단일 URL 파라미터의 값을 런타임에서 검사하여 안정성 있게 사용하기 위한 Getter 함수입니다.
 * 주어진 유효성 검사(validator)를 통과하지 못하면 에러를 던지거나, 콘솔에 에러를 출력합니다.
 * 경로(path) 혹은 쿼리(query) 파라미터를 읽어올 지 전략을 선택할 수 있습니다.
 *
 * @param name URL 파라미터 이름
 * @param fallback URL 파라미터 값이 없을 경우 반환할 fallback 값
 * @param options.validator URL 파라미터 값 검증 Predicate 함수
 * @param options.errorMessage 유효하지 않을 경우 출력할 에러 메시지
 * @param options.part URL의 경로(path)와 쿼리(query) 파라미터 중 어떤 부분에서 읽어올 것인지 선택하는 토큰
 * @param options.strict true일 경우 에러 throw, false일 경우 console 에러
 *
 * @returns URL 파라미터 값
 */
function useUrlParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(
  name: TKey,
  fallback: TFallback | undefined,
  options: UseUrlParamOptions<TValue>
) {
  const { validator, errorMessage, part, strict = false } = options;

  const values = useUnsafeUrlParam(part)<TValue, TKey, TFallback>(
    name,
    fallback
  );

  useEffect(() => {
    if (!values) return;

    if (validator(values)) return;

    const _errorMessage =
      typeof errorMessage === 'function' ? errorMessage(values) : errorMessage;

    if (strict) {
      throw new TypeError(_errorMessage);
    } else {
      console.error(_errorMessage);
    }
  }, [values, validator, errorMessage, strict]);

  return values;
}

export type { UseUrlParamOptions };

export default useUrlParam;
