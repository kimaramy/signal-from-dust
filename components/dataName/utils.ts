import { AppDataName } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseDataNameKey = (
  params?: Parameters<typeof parseUrlParam>[0]
) => {
  const [parsedKey] = parseUrlParam(
    params,
    AppDataName.schema.name,
    AppDataName.schema.defaultKey
  );
  return AppDataName.schema.upperCaseKey(parsedKey);
};
