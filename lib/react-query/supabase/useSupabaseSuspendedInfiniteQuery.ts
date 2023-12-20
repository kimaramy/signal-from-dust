import { type QueryKey } from '@tanstack/react-query';

import { useSbIQ, type UseSbIQOptions } from './useSupabaseInfiniteQuery';

/**
 * @alias UseSbSIQOptions
 * @description Abbreviation of UseSupabaseSuspendedInfiniteQueryOptions
 */
type UseSupabaseSuspendedInfiniteQueryOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseSbIQOptions<TQueryFnData, TData, TQueryKey>,
  'suspense' | 'useErrorBoundary' | 'onError'
>;

/**
 * @alias useSbSIQ
 * @description Abbreviation of useSupabaseSuspensedInfiniteQuery
 */
function useSupabaseSuspensedInfiniteQuery<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseSupabaseSuspendedInfiniteQueryOptions<
    TQueryFnData,
    TData,
    TQueryKey
  >
) {
  const { isLoading, isFetching, isError, error, ...others } = useSbIQ({
    useErrorBoundary: true,
    suspense: true,
    ...options,
  });
  return others;
}

export { useSupabaseSuspensedInfiniteQuery as useSbSIQ };
export type { UseSupabaseSuspendedInfiniteQueryOptions as UseSbSIQOptions };
