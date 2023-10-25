'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollectionValue } from '@/components/collection';

import { useSeasonValue, useSetSeasonValue } from './hooks';
import { Season, seasonMap, seasonSet } from './schema';
import { toKoreanSeasonName } from './utils';

export interface SeasonSelectProps {}

export default function SeasonSelect() {
  const collection = useCollectionValue();

  const season = useSeasonValue();

  const setSeason = useSetSeasonValue();

  const isVisible = collection === 'Seasonally';

  const seasons = seasonSet.slice();

  const defaultSeason = seasons.splice(
    seasons.indexOf(seasonMap.Default),
    1
  )[0];

  if (!isVisible) return null;

  return (
    <Select
      value={season}
      onValueChange={(value) => setSeason(value as Season)}
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select a season" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultSeason}>
          {toKoreanSeasonName(defaultSeason)}
        </SelectItem>
        {seasons.map((season) => (
          <SelectItem key={season} value={season}>
            {toKoreanSeasonName(season)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
