import { SeasonUtils } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseSeasonKey = (
  params?: Parameters<typeof parseUrlParam>[0]
) => {
  const [parsedKey] = parseUrlParam(
    params,
    SeasonUtils.schema.name,
    SeasonUtils.schema.defaultKey
  );
  return SeasonUtils.schema.upperCaseKey(parsedKey);
};
