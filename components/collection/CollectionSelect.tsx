import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { CollectionUtils } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CollectionSelectProps {
  value: CollectionUtils.Key;
  onValueChange: (value: CollectionUtils.Key) => void;
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

  const {
    locale,
    dictionary: { settings },
  } = useLocaleDictionary();

  const collectionKeys = CollectionUtils.schema.getAllKeys();

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder={settings.form.collection.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {collectionKeys.map((collectionKey) => (
          <SelectItem key={collectionKey} value={collectionKey}>
            {CollectionUtils.schema.display(collectionKey, locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CollectionSelect;
