import { isEmptyString } from './usePlainStringQueryParam';
import useSafeQueryParam from './useSafeQueryParam';

function isStringifiedNumber(value: string) {
  if (isEmptyString(value)) {
    const warning = `${value} is a empty string that will be converted to 0. Be careful when handle returned value.`;
    console.warn(warning);
  }
  return !Number.isNaN(Number(value));
}

function useNumberQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(name: TKey, fallback?: TFallback) {
  return useSafeQueryParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) => values.every((value) => isStringifiedNumber(value)),
    errorMessage: (value) =>
      `Type of '${name}' must be a stringified number format(ex. '10'). But received ${JSON.stringify(
        value
      )}.`,
  });
}

export { isStringifiedNumber };

export default useNumberQueryParam;
