import { parseOrNot } from '../utils';
import useUrlParam, { type UseUrlParamOptions } from './useUrlParam';

export function isStringifiedBoolean(value: string) {
  return value === 'true' || value === 'false';
}

export const getBooleanErrorMessage = (name: string, value: string) =>
  `Type of '${name}' must be a stringified boolean format(ex. 'true' or 'false'). But received ${value}.`;

export default function useBooleanUrlParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
  TParsed extends boolean = false,
>(
  name: TKey,
  fallback?: TFallback,
  options?: { parse?: TParsed } & Pick<UseUrlParamOptions<TValue>, 'part'>
) {
  const values = useUrlParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) => values.every((value) => isStringifiedBoolean(value)),
    errorMessage: (value) =>
      getBooleanErrorMessage(name, JSON.stringify(value)),
    part: options?.part,
  });
  return parseOrNot(
    values,
    (value) => JSON.parse(value) as boolean,
    (options?.parse ?? false) as TParsed
  );
}
