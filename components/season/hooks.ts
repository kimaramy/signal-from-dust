import { AppSeason } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

export function useSeasonKey(
  part?: URLPart,
  initialKey?: AppSeason.Key
): AppSeason.Key {
  const [lowerCasedKey] = useEnumUrlParam(
    AppSeason.schema.name,
    AppSeason.schema.lowerCaseKey(initialKey ?? AppSeason.schema.defaultKey),
    {
      enums: AppSeason.schema.mapKeys(AppSeason.schema.lowerCaseKey),
      part,
    }
  );
  return AppSeason.schema.upperCaseKey(lowerCasedKey);
}

export function useSeasonValue(): AppSeason.Value {
  const seasonKey = useSeasonKey();
  return AppSeason.schema.getValue(seasonKey);
}

export function useSetSeasonKey() {
  const setSeasonKey = useSetQueryParam(AppSeason.schema.name);
  return function (seasonKey: AppSeason.Key) {
    return setSeasonKey(AppSeason.schema.lowerCaseKey(seasonKey));
  };
}
