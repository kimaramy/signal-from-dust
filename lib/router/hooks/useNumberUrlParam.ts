import { isEmptyString } from './usePlainUrlParam';
import useSafeUrlParam, {
  type UseSafeUrlParamOptions,
} from './useSafeUrlParam';

export function isStringifiedNumber(value: string) {
  if (isEmptyString(value)) {
    const warning = `${value} is a empty string that will be converted to 0. Be careful when handle returned value.`;
    console.warn(warning);
  }
  return !Number.isNaN(Number(value));
}

export function useNumberUrlParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
  TParsed extends boolean = false,
>(
  name: TKey,
  fallback: TFallback | undefined,
  options?: {
    parse?: TParsed;
  } & Pick<UseSafeUrlParamOptions<TValue>, 'part'>
) {
  const values = useSafeUrlParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) => values.every((value) => isStringifiedNumber(value)),
    errorMessage: (value) =>
      `Type of '${name}' must be a stringified number format(ex. '10'). But received ${JSON.stringify(
        value
      )}.`,
    part: options?.part,
  });
  let parsedValues: unknown = values;
  if (options?.parse && Array.isArray(values)) {
    parsedValues = values.map(Number);
  }
  return parsedValues as TParsed extends true ? number[] : typeof values;
}
