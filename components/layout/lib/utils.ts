import { parseUrlParam } from '@/lib/router';

import { LayoutUtils } from './schemes/layout';

export const parseLayoutKey = (
  params?: Parameters<typeof parseUrlParam>[0]
) => {
  const [parsedKey] = parseUrlParam(
    params,
    LayoutUtils.schema.name,
    LayoutUtils.schema.defaultKey
  );
  return LayoutUtils.schema.upperCaseKey(parsedKey);
};
