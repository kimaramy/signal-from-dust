import useSafeUrlParam, {
  type UseSafeUrlParamOptions,
} from './useSafeUrlParam';

export function useEnumUrlParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(
  name: TKey,
  fallback: TFallback | undefined,
  options: { enums: TValue[] } & Pick<UseSafeUrlParamOptions<TValue>, 'part'>
) {
  return useSafeUrlParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) =>
      values.every((value) => options.enums.includes(value)),
    errorMessage: (value) =>
      `'${value}'(the value of '${name}') is not included in the ${JSON.stringify(
        options.enums
      )}`,
    part: options?.part,
  });
}
