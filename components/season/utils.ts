import { seasonSchema } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseSeasonKey = (
  params?: Parameters<typeof parseUrlParam>[0]
) => {
  const [parsedKey] = parseUrlParam(
    params,
    seasonSchema.name,
    seasonSchema.defaultKey
  );
  return seasonSchema.upperCaseKey(parsedKey);
};
