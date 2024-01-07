import { LocationUtils } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseLocationKey = (
  params?: Parameters<typeof parseUrlParam>[0]
) => {
  const [parsedKey] = parseUrlParam(
    params,
    LocationUtils.schema.name,
    LocationUtils.schema.defaultKey
  );
  return LocationUtils.schema.upperCaseKey(parsedKey);
};
