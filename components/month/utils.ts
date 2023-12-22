import { monthSchema } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseMonthKey = (params?: Parameters<typeof parseUrlParam>[0]) => {
  const [parsedKey] = parseUrlParam(
    params,
    monthSchema.name,
    monthSchema.defaultKey
  );
  return monthSchema.upperCaseKey(parsedKey);
};
