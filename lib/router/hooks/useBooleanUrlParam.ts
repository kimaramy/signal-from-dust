import useSafeUrlParam from './useSafeUrlParam';

export function isStringifiedBoolean(value: string) {
  return value === 'true' || value === 'false';
}

export function useBooleanQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
  TParsed extends boolean = false,
>(
  name: TKey,
  fallback: TFallback | undefined,
  options?: {
    parse: TParsed;
  }
) {
  const values = useSafeUrlParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    strategy: 'query',
    validator: (values) => values.every((value) => isStringifiedBoolean(value)),
    errorMessage: (value) =>
      `Type of '${name}' must be a stringified boolean format(ex. 'true'). But received ${JSON.stringify(
        value
      )}.`,
  });
  let parsedValues: unknown = values;
  if (options?.parse && Array.isArray(values)) {
    parsedValues = values.map((value) => JSON.parse(value));
  }
  return parsedValues as TParsed extends true ? boolean[] : typeof values;
}
