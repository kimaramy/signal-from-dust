'use client';

import { useEffect } from 'react';

import usePathParam from './usePathParam';

/**
 * 단일 경로 파라미터의 값을 타입 검사하여 안정성 있게 사용하기 위한 Getter 함수입니다.
 * 주어진 유효성 검사(validator)를 통과하지 못하면 에러를 던지거나, 콘솔에 에러를 출력합니다.
 * 그 외 스펙은 usePathParam과 동일합니다.
 *
 * @param name 경로 파라미터 이름
 * @param fallback 경로 파라미터 값이 없을 경우 반환할 fallback 값
 * @param options.validator 경로 파라미터 값 검증 Predicate 함수
 * @param options.errorMessage 유효하지 않을 경우 출력할 에러 메시지
 * @param options.strict true일 경우 에러 throw, false일 경우 console 에러
 *
 * @returns 경로 파라미터 값
 */
function useSafePathParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(
  name: TKey,
  fallback: TFallback | undefined,
  options: {
    validator: (values: TValue[]) => boolean;
    errorMessage?: string | ((values: TValue[]) => string);
    strict?: boolean;
  }
) {
  const { validator, errorMessage, strict = false } = options;

  const values = usePathParam<TValue, TKey, TFallback>(name, fallback);

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

export default useSafePathParam;
