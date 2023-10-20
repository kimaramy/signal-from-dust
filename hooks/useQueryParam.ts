import { useSearchParams } from 'next/navigation';

type ConditionalType<TValue, TFallbackValue> = TFallbackValue extends undefined
  ? TValue | null
  : TValue;

/**
 * 단일 쿼리 파라미터 값을 읽어와 반환하는 Getter 함수입니다.
 *
 * @param name 쿼리 파라미터 이름
 * @param fallbackValue 쿼리 파라미터 값이 없을 경우 해당 값에 의존하는 UI를 위한 fallback 값
 *
 * @returns 쿼리 파라미터 값
 */
function useQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallbackValue extends TValue = TValue
>(name: TKey, fallbackValue: TFallbackValue) {
  const searchParams = useSearchParams();

  const values = searchParams.getAll(name) as TValue[]; // 값이 없다면 빈배열 반환

  return values.length > 0 ? values : [fallbackValue];
}

export default useQueryParam;
