import { seasonSchema, type SeasonKey, type SeasonValue } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

export function useSeasonKey(
  part?: URLPart,
  initialKey?: SeasonKey
): SeasonKey {
  const [lowerCasedKey] = useEnumUrlParam(
    seasonSchema.name,
    seasonSchema.lowerCaseKey(initialKey ?? seasonSchema.defaultKey),
    {
      enums: seasonSchema.mapKeys(seasonSchema.lowerCaseKey),
      part,
    }
  );
  return seasonSchema.upperCaseKey(lowerCasedKey);
}

export function useSeasonValue(): SeasonValue {
  const seasonKey = useSeasonKey();
  return seasonSchema.getValue(seasonKey);
}

export function useSetSeasonKey() {
  const setSeasonKey = useSetQueryParam(seasonSchema.name);
  return function (seasonKey: SeasonKey) {
    return setSeasonKey(seasonSchema.lowerCaseKey(seasonKey));
  };
}
