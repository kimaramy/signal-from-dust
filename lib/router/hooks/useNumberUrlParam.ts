import { parseOrNot } from '../utils';
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

export const getNumberErrorMessage = (name: string, value: string) =>
  `Type of '${name}' must be a stringified number format(ex. '10'). But received ${value}.`;

export default function useNumberUrlParam<
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
    validator: (values) => values.every((value) => isStringifiedNumber(value)),
    errorMessage: (value) => getNumberErrorMessage(name, JSON.stringify(value)),
    part: options?.part,
  });
  return parseOrNot(
    values,
    (value) => Number(value),
    (options?.parse ?? false) as TParsed
  );
}
