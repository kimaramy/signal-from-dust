import useSafeUrlParam, {
  type UseSafeUrlParamOptions,
} from './useSafeUrlParam';

export const getDateErrorMessage = (
  name: string,
  value: string,
  enums: string
) => `'${value}'(the value of '${name}') is not included in the ${enums}`;

export default function useEnumUrlParam<
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
      getDateErrorMessage(
        name,
        JSON.stringify(value),
        JSON.stringify(options.enums)
      ),
    part: options?.part,
  });
}
