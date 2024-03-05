export type FetchOptions = { signal?: AbortSignal };

export const abortController = new AbortController();

const baseFetchOptions = Object.freeze({
  signal: abortController.signal,
} satisfies FetchOptions);

export const getFetchOptions = (fetchOptions?: FetchOptions) => ({
  ...baseFetchOptions,
  ...fetchOptions,
});

export function fetcher<TParams, TReturn extends Promise<unknown>>(
  fn: (
    params: TParams,
    fetchOptions: ReturnType<typeof getFetchOptions>
  ) => TReturn
) {
  return function (params: TParams, fetchOptions?: FetchOptions) {
    return fn(params, getFetchOptions(fetchOptions));
  };
}
