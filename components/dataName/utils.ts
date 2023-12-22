import { dataNameSchema } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseDataNameKey = (
  params?: Parameters<typeof parseUrlParam>[0]
) => {
  const [parsedKey] = parseUrlParam(
    params,
    dataNameSchema.name,
    dataNameSchema.defaultKey
  );
  return dataNameSchema.upperCaseKey(parsedKey);
};
