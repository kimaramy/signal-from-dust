import { cn } from '@/lib/css';
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
  const {
    value,
    onValueChange,
    hidden = false,
    disabled = false,
    className,
  } = props;

  const dataNameKeys = DataNameUtils.schema.getAllKeys();

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 데이터 선택" />
      </SelectTrigger>
      <SelectContent>
        {dataNameKeys.map((dataNameKey) => (
          <SelectItem key={dataNameKey} value={dataNameKey}>
            {DataNameUtils.schema.display(dataNameKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DataNameSelect;
