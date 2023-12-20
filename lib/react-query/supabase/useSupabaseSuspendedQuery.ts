import { type QueryKey } from '@tanstack/react-query';

import { useSbQ, type UseSbQOptions } from './useSupabaseQuery';

/**
 * @alias UseSbSQOptions
 * @description Abbreviation of UseSupabaseSuspendedQueryOptions
 */
type UseSupabaseSuspendedQueryOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseSbQOptions<TQueryFnData, TData, TQueryKey>,
  'suspense' | 'useErrorBoundary' | 'onError'
>;

/**
 * @alias useSbSQ
 * @description Abbreviation of useSupabaseSuspendedQuery
 */
function useSupabaseSuspendedQuery<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(options: UseSupabaseSuspendedQueryOptions<TQueryFnData, TData, TQueryKey>) {
  const { isLoading, isFetching, isError, error, ...others } = useSbQ({
    useErrorBoundary: true,
    suspense: true,
    ...options,
  });
  return others;
}

export { useSupabaseSuspendedQuery as useSbSQ };
export type { UseSupabaseSuspendedQueryOptions as UseSbSQOptions };
