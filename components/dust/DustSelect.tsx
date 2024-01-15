import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { DustUtils } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DustSelectProps {
  value: DustUtils.Key;
  onValueChange: (value: DustUtils.Key) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function DustSelect(props: DustSelectProps) {
  const { value, onValueChange, hidden = false, disabled, className } = props;

  const {
    locale,
    dictionary: { settings },
  } = useLocaleDictionary();

  const dustKeys = DustUtils.schema.getAllKeys();

  return (
    <Select
      value={value}
      disabled={disabled ?? dustKeys.length < 2}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder={settings.form.dust.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {dustKeys.map((dustKey) => (
          <SelectItem key={dustKey} value={dustKey}>
            {DustUtils.schema.display(dustKey, locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DustSelect;
