import { AppCollection } from '@/lib/model';
import { parseUrlParam } from '@/lib/router';

export const parseCollectionKey = (
  params?: Parameters<typeof parseUrlParam>[0]
) => {
  const [parsedKey] = parseUrlParam(
    params,
    AppCollection.schema.name,
    AppCollection.schema.defaultKey
  );
  return AppCollection.schema.upperCaseKey(parsedKey);
};
