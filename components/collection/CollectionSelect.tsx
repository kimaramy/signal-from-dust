'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Collection, collections } from './schema';
import { translateCollection } from './utils';

interface CollectionSelectProps {
  value: Collection;
  onValueChange: (value: Collection) => void;
  hidden?: boolean;
  disabled?: boolean;
}

function CollectionSelect(props: CollectionSelectProps) {
  const { value, onValueChange, hidden = false, disabled = false } = props;

  if (hidden) return null;

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="조회 기간 선택" />
      </SelectTrigger>
      <SelectContent>
        {collections.map((collection) => (
          <SelectItem key={collection} value={collection}>
            {translateCollection(collection)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CollectionSelect;
