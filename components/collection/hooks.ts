import { AppCollection } from '@/lib/model';
import { useEnumUrlParam, type URLPart } from '@/lib/router';

export function useCollectionKey(part?: URLPart): AppCollection.Key {
  const [lowerCasedKey] = useEnumUrlParam(
    AppCollection.schema.name,
    AppCollection.schema.lowerCaseKey(AppCollection.schema.defaultKey),
    {
      enums: AppCollection.schema.mapKeys(AppCollection.schema.lowerCaseKey),
      part,
    }
  );
  return AppCollection.schema.upperCaseKey(lowerCasedKey);
}
