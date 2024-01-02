import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { DataNameUtils } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataNameSelectProps {
  value: DataNameUtils.Key;
  onValueChange: (value: DataNameUtils.Key) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function DataNameSelect(props: DataNameSelectProps) {
  const { value, onValueChange, hidden = false, disabled, className } = props;

  const {
    locale,
    dictionary: { settings },
  } = useLocaleDictionary();

  const dataNameKeys = DataNameUtils.schema.getAllKeys();

  return (
    <Select
      value={value}
      disabled={disabled ?? dataNameKeys.length < 2}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder={settings.form.dataName.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {dataNameKeys.map((dataNameKey) => (
          <SelectItem key={dataNameKey} value={dataNameKey}>
            {DataNameUtils.schema.display(dataNameKey, locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DataNameSelect;
