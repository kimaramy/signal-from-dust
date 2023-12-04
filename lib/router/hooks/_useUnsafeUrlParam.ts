import usePathParam from './_usePathParam';
import useQueryParam from './_useQueryParam';

type UrlParams = { [key: string]: string[] | string | undefined };

type ParsedUrlParam<TValue, TFallback> = TFallback extends TValue
  ? TValue[]
  : TValue[] | undefined;

type UseUrlParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
> = (name: TKey, fallback?: TFallback) => ParsedUrlParam<TValue, TFallback>;

type URLPart = 'path' | 'query';

const defaultURLPart: URLPart = 'query';

const useUnsafeUrlParam = (part: URLPart = defaultURLPart) =>
  part === 'path' ? usePathParam : useQueryParam;

function parseUrlParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(params = {} as UrlParams, name: TKey, fallback?: TFallback) {
  const maybeArrayOrUndefined = params[name] ?? undefined;

  const maybeEmptyArray = Array.isArray(maybeArrayOrUndefined)
    ? maybeArrayOrUndefined
    : maybeArrayOrUndefined
    ? [maybeArrayOrUndefined]
    : [];

  const undefinedOrNonEmptyArray =
    maybeEmptyArray.length > 0
      ? maybeEmptyArray
      : fallback
      ? [fallback]
      : undefined;

  return undefinedOrNonEmptyArray as ParsedUrlParam<TValue, TFallback>;
}

export type { UrlParams, ParsedUrlParam, UseUrlParam, URLPart };

export { defaultURLPart, parseUrlParam };

export default useUnsafeUrlParam;
