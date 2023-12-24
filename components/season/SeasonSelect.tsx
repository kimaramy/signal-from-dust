import { cn } from '@/lib/css';
import { SeasonUtils } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SeasonSelectProps {
  value: SeasonUtils.Key;
  onValueChange: (value: SeasonUtils.Key) => void;
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

  const seasonKeys = SeasonUtils.schema.getAllKeys();

  const defaultSeasonKey = seasonKeys.splice(
    seasonKeys.indexOf(SeasonUtils.schema.defaultKey),
    1
  )[0];

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 계절 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultSeasonKey}>
          {SeasonUtils.schema.display(defaultSeasonKey)}
        </SelectItem>
        {seasonKeys.map((seasonKey) => (
          <SelectItem key={seasonKey} value={seasonKey}>
            {SeasonUtils.schema.display(seasonKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SeasonSelect;
