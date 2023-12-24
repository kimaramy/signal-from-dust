import { SeasonUtils } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

export function useSeasonKey(
  part?: URLPart,
  initialKey?: SeasonUtils.Key
): SeasonUtils.Key {
  const [lowerCasedKey] = useEnumUrlParam(
    SeasonUtils.schema.name,
    SeasonUtils.schema.lowerCaseKey(
      initialKey ?? SeasonUtils.schema.defaultKey
    ),
    {
      enums: SeasonUtils.schema.mapKeys(SeasonUtils.schema.lowerCaseKey),
      part,
    }
  );
  return SeasonUtils.schema.upperCaseKey(lowerCasedKey);
}

export function useSeasonValue(): SeasonUtils.Value {
  const seasonKey = useSeasonKey();
  return SeasonUtils.schema.getValue(seasonKey);
}

export function useSetSeasonKey() {
  const setSeasonKey = useSetQueryParam(SeasonUtils.schema.name);
  return function (seasonKey: SeasonUtils.Key) {
    return setSeasonKey(SeasonUtils.schema.lowerCaseKey(seasonKey));
  };
}
