import { yearSchema } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseYearKey = (params?: Parameters<typeof parseUrlParam>[0]) => {
  const [parsedKey] = parseUrlParam(
    params,
    yearSchema.name,
    yearSchema.defaultKey
  );
  return yearSchema.upperCaseKey(parsedKey);
};
