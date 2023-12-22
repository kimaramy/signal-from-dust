import { collectionSchema, type CollectionKey } from '@/lib/model';
import { useEnumUrlParam, type URLPart } from '@/lib/router';

export function useCollectionKey(part?: URLPart): CollectionKey {
  const [lowerCasedKey] = useEnumUrlParam(
    collectionSchema.name,
    collectionSchema.lowerCaseKey(collectionSchema.defaultKey),
    {
      enums: collectionSchema.mapKeys(collectionSchema.lowerCaseKey),
      part,
    }
  );
  return collectionSchema.upperCaseKey(lowerCasedKey);
}
