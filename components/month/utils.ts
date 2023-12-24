import { MonthUtils } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseMonthKey = (params?: Parameters<typeof parseUrlParam>[0]) => {
  const [parsedKey] = parseUrlParam(
    params,
    MonthUtils.schema.name,
    MonthUtils.schema.defaultKey
  );
  return MonthUtils.schema.upperCaseKey(parsedKey);
};
