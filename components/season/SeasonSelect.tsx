import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { seasonSchema, type SeasonKey } from './schema';

interface SeasonSelectProps {
  value: SeasonKey;
  onValueChange: (value: SeasonKey) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function SeasonSelect(props: SeasonSelectProps) {
  const {
    value,
    onValueChange,
    hidden = false,
    disabled = false,
    className,
  } = props;

  const seasonKeys = seasonSchema.getAllKeys();

  const defaultSeasonKey = seasonKeys.splice(
    seasonKeys.indexOf(seasonSchema.getDefaultKey()),
    1
  )[0];

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 계절 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultSeasonKey}>
          {seasonSchema.display(defaultSeasonKey)}
        </SelectItem>
        {seasonKeys.map((seasonKey) => (
          <SelectItem key={seasonKey} value={seasonKey}>
            {seasonSchema.display(seasonKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SeasonSelect;
