import { useCallback } from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

export type UseWriteQueryParamsReturn<T> = T extends true
  ? `?${string}`
  : ReadonlyURLSearchParams;

export function useWriteQueryParams() {
  const oldReadonlyURLSearchParams = useSearchParams();

  const writeQueryParams = useCallback(
    <T extends boolean = false>(
      writeFn: (
        oldReadonlyURLSearchParams: ReadonlyURLSearchParams
      ) => URLSearchParams,
      formatOptions?: {
        stringify: T;
      }
    ): UseWriteQueryParamsReturn<T> => {
      const newReadonlyURLSearchParams = new ReadonlyURLSearchParams(
        writeFn(oldReadonlyURLSearchParams)
      );
      const maybeStringified = formatOptions?.stringify
        ? (`?${newReadonlyURLSearchParams.toString()}` as const) // URLSearchParams.toString() has no '?' prefix
        : newReadonlyURLSearchParams;
      return maybeStringified as any;
    },
    [oldReadonlyURLSearchParams]
  );

  return writeQueryParams;
}
