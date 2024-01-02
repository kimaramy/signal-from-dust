import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
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
  const { value, onValueChange, hidden = false, disabled, className } = props;

  const {
    locale,
    dictionary: { settings },
  } = useLocaleDictionary();

  const seasonKeys = SeasonUtils.schema.getAllKeys();

  const defaultSeasonKey = seasonKeys.splice(
    seasonKeys.indexOf(SeasonUtils.schema.defaultKey),
    1
  )[0];

  return (
    <Select
      value={value}
      disabled={disabled ?? seasonKeys.length < 2}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder={settings.form.season.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultSeasonKey}>
          {SeasonUtils.schema.display(defaultSeasonKey, locale)}
        </SelectItem>
        {seasonKeys.map((seasonKey) => (
          <SelectItem key={seasonKey} value={seasonKey}>
            {SeasonUtils.schema.display(seasonKey, locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SeasonSelect;
