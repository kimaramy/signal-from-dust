'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Season, seasonMap, seasonSet } from './schema';
import { translateSeason } from './utils';

interface SeasonSelectProps {
  value: Season;
  onValueChange: (value: Season) => void;
  hidden?: boolean;
  disabled?: boolean;
}

function SeasonSelect(props: SeasonSelectProps) {
  const { value, onValueChange, hidden = false, disabled = false } = props;

  const seasons = seasonSet.slice();

  const defaultSeason = seasons.splice(
    seasons.indexOf(seasonMap.Default),
    1
  )[0];

  if (hidden) return null;

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="조회 계절 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultSeason}>
          {translateSeason(defaultSeason)}
        </SelectItem>
        {seasons.map((season) => (
          <SelectItem key={season} value={season}>
            {translateSeason(season)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SeasonSelect;
