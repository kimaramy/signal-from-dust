import useSafeUrlParam, {
  type UseSafeUrlParamOptions,
} from './useSafeUrlParam';

export function isStringifiedDate(value: string) {
  return !Number.isNaN(Date.parse(value));
}

export function useDateUrlParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
  TParsed extends boolean = false,
>(
  name: TKey,
  fallback: TFallback | undefined,
  options?: { parse?: TParsed } & Pick<UseSafeUrlParamOptions<TValue>, 'part'>
) {
  const values = useSafeUrlParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) => values.every((value) => isStringifiedDate(value)),
    errorMessage: (value) =>
      `Type of '${name}' must be a stringified date format(ex. '2023-09-01'). But received ${JSON.stringify(
        value
      )}.`,
    part: options?.part,
  });
  let parsedValues: unknown = values;
  if (options?.parse && Array.isArray(values)) {
    parsedValues = values.map((value) => new Date(value));
  }
  return parsedValues as TParsed extends true ? Date[] : typeof values;
}
