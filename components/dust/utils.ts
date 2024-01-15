import { DustUtils } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseDustKey = (params?: Parameters<typeof parseUrlParam>[0]) => {
  const [parsedKey] = parseUrlParam(
    params,
    DustUtils.schema.name,
    DustUtils.schema.defaultKey
  );
  return DustUtils.schema.upperCaseKey(parsedKey);
};
