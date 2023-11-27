export type UseUrlParamReturn<TValue, TFallback> = TFallback extends TValue
  ? TValue[]
  : TValue[] | undefined;

export type UseUrlParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
> = (name: TKey, fallback?: TFallback) => UseUrlParamReturn<TValue, TFallback>;
