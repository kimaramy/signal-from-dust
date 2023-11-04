import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { dataCollectionSchema, type DataCollectionKey } from './schema';

interface DataCollectionSelectProps {
  value: DataCollectionKey;
  onValueChange: (value: DataCollectionKey) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function DataCollectionSelect(props: DataCollectionSelectProps) {
  const {
    value,
    onValueChange,
    hidden = false,
    disabled = false,
    className,
  } = props;

  const dataCollectionKeys = dataCollectionSchema.getAllKeys();

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 기간 선택" />
      </SelectTrigger>
      <SelectContent>
        {dataCollectionKeys.map((dataCollectionKey) => (
          <SelectItem key={dataCollectionKey} value={dataCollectionKey}>
            {dataCollectionSchema.display(dataCollectionKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DataCollectionSelect;
