import { parseOrNot } from '../utils';
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
  fallback?: TFallback,
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
  return parseOrNot(
    values,
    (value) => new Date(value),
    (options?.parse ?? false) as TParsed
  );
}
