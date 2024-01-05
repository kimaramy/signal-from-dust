import { CollectionUtils } from '@/lib/model';
import { useEnumUrlParam, type URLPart } from '@/lib/router';

export function useCollectionKey(part?: URLPart): CollectionUtils.Key {
  const [lowerCasedKey] = useEnumUrlParam(
    CollectionUtils.schema.name,
    CollectionUtils.schema.lowerCaseKey(CollectionUtils.schema.defaultKey),
    {
      enums: CollectionUtils.schema.mapKeys(
        CollectionUtils.schema.lowerCaseKey
      ),
      part,
    }
  );
  return CollectionUtils.schema.upperCaseKey(lowerCasedKey);
}
