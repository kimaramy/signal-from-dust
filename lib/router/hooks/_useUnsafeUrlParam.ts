import usePathParam from './_usePathParam';
import useQueryParam from './_useQueryParam';

type URLParams = { [key: string]: string[] | string | undefined };

type ParsedURLParam<TValue, TFallback> = TFallback extends TValue
  ? TValue[]
  : TValue[] | undefined;

type UseURLParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
> = (name: TKey, fallback?: TFallback) => ParsedURLParam<TValue, TFallback>;

type URLPart = 'path' | 'query';

const defaultURLPart: URLPart = 'query';

const useUnsafeUrlParam = (part: URLPart = defaultURLPart) =>
  part === 'path' ? usePathParam : useQueryParam;

function parseUrlParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(params = {} as URLParams, name: TKey, fallback?: TFallback) {
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

  return undefinedOrNonEmptyArray as ParsedURLParam<TValue, TFallback>;
}

export type { URLParams, ParsedURLParam, UseURLParam, URLPart };

export { defaultURLPart, parseUrlParam };

export default useUnsafeUrlParam;
