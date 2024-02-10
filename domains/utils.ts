export type FetchOptions = { signal?: AbortSignal };

export const defaultAbortController = new AbortController();

const defualtFetchOptions = Object.freeze({
  signal: AbortSignal.timeout(10000), // 10 seconds
} satisfies FetchOptions);

export const getFetchOptions = (options?: FetchOptions) => ({
  ...options,
  ...defualtFetchOptions,
});
