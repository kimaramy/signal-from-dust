import { DataNameUtils } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseDataNameKey = (
  params?: Parameters<typeof parseUrlParam>[0]
) => {
  const [parsedKey] = parseUrlParam(
    params,
    DataNameUtils.schema.name,
    DataNameUtils.schema.defaultKey
  );
  return DataNameUtils.schema.upperCaseKey(parsedKey);
};
