import { collectionSchema } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseCollectionKey = (
  params?: Parameters<typeof parseUrlParam>[0]
) => {
  const [parsedKey] = parseUrlParam(
    params,
    collectionSchema.name,
    collectionSchema.defaultKey
  );
  return collectionSchema.upperCaseKey(parsedKey);
};
