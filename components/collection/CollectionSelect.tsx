import { cn } from '@/lib/css';
import { AppCollection } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CollectionSelectProps {
  value: AppCollection.Key;
  onValueChange: (value: AppCollection.Key) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function CollectionSelect(props: CollectionSelectProps) {
  const {
    value,
    onValueChange,
    hidden = false,
    disabled = false,
    className,
  } = props;

  const collectionKeys = AppCollection.schema.getAllKeys();

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 기간 선택" />
      </SelectTrigger>
      <SelectContent>
        {collectionKeys.map((collectionKey) => (
          <SelectItem key={collectionKey} value={collectionKey}>
            {AppCollection.schema.display(collectionKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CollectionSelect;
