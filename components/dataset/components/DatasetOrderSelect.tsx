import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { DatasetOrderUtils } from '../lib';

interface DatasetOrderSelectProps {
  value: DatasetOrderUtils.Key;
  onValueChange: (value: DatasetOrderUtils.Key) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function DatasetOrderSelect(props: DatasetOrderSelectProps) {
  const { value, onValueChange, hidden = false, disabled, className } = props;

  const { locale } = useLocaleDictionary();

  const datasetOrderKeys = DatasetOrderUtils.schema.getAllKeys();

  const defaultDatasetOrderKey = datasetOrderKeys.splice(
    datasetOrderKeys.indexOf(DatasetOrderUtils.schema.defaultKey),
    1
  )[0];

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-32', hidden && 'hidden', className)}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultDatasetOrderKey}>
          {DatasetOrderUtils.schema.display(defaultDatasetOrderKey, locale)}
        </SelectItem>
        {datasetOrderKeys.map((datasetOrderKey) => (
          <SelectItem key={datasetOrderKey} value={datasetOrderKey}>
            {DatasetOrderUtils.schema.display(datasetOrderKey, locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DatasetOrderSelect;
