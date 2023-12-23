import { AppMonth } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseMonthKey = (params?: Parameters<typeof parseUrlParam>[0]) => {
  const [parsedKey] = parseUrlParam(
    params,
    AppMonth.schema.name,
    AppMonth.schema.defaultKey
  );
  return AppMonth.schema.upperCaseKey(parsedKey);
};
