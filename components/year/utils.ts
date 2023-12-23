import { AppYear } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseYearKey = (params?: Parameters<typeof parseUrlParam>[0]) => {
  const [parsedKey] = parseUrlParam(
    params,
    AppYear.schema.name,
    AppYear.schema.defaultKey
  );
  return AppYear.schema.upperCaseKey(parsedKey);
};
