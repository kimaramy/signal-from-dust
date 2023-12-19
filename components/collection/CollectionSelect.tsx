import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { collectionSchema, type CollectionKey } from './schema';

interface CollectionSelectProps {
  value: CollectionKey;
  onValueChange: (value: CollectionKey) => void;
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

  const collectionKeys = collectionSchema.getAllKeys();

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 기간 선택" />
      </SelectTrigger>
      <SelectContent>
        {collectionKeys.map((collectionKey) => (
          <SelectItem key={collectionKey} value={collectionKey}>
            {collectionSchema.display(collectionKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CollectionSelect;
