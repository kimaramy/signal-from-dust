import { YearUtils } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseYearKey = (params?: Parameters<typeof parseUrlParam>[0]) => {
  const [parsedKey] = parseUrlParam(
    params,
    YearUtils.schema.name,
    YearUtils.schema.defaultKey
  );
  return YearUtils.schema.upperCaseKey(parsedKey);
};
