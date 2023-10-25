'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useCollectionValue, useSetCollectionValue } from './hooks';
import { Collection, collectionSet } from './schema';
import { toKoreanCollectionName } from './utils';

export interface CollectionSelectProps {}

export default function CollectionSelect() {
  const collection = useCollectionValue();

  const setCollection = useSetCollectionValue();

  return (
    <Select
      value={collection}
      onValueChange={(value) => setCollection(value as Collection)}
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select a collection" />
      </SelectTrigger>
      <SelectContent>
        {collectionSet.slice().map((collection) => (
          <SelectItem key={collection} value={collection}>
            {toKoreanCollectionName(collection)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
