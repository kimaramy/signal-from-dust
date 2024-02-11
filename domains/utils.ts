export type FetchOptions = { signal?: AbortSignal };

export const abortController = new AbortController();

const baseFetchOptions = Object.freeze({
  signal: abortController.signal,
} satisfies FetchOptions);

export const getFetchOptions = (fetchOptions?: FetchOptions) => ({
  ...baseFetchOptions,
  ...fetchOptions,
});
