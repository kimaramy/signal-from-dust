import { CollectionUtils } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseCollectionKey = (
  params?: Parameters<typeof parseUrlParam>[0]
) => {
  const [parsedKey] = parseUrlParam(
    params,
    CollectionUtils.schema.name,
    CollectionUtils.schema.defaultKey
  );
  return CollectionUtils.schema.upperCaseKey(parsedKey);
};
