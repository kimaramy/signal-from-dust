import { AppSeason } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseSeasonKey = (
  params?: Parameters<typeof parseUrlParam>[0]
) => {
  const [parsedKey] = parseUrlParam(
    params,
    AppSeason.schema.name,
    AppSeason.schema.defaultKey
  );
  return AppSeason.schema.upperCaseKey(parsedKey);
};
