'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import { useCollectionKey } from '@/components/collection';
import FakeDataset from '@/components/FakeDataset';

function Loading() {
  const segment = useSelectedLayoutSegment();

  const collectionKey = useCollectionKey(
    segment === 'search' ? 'query' : 'path'
  );

  return <FakeDataset collectionKey={collectionKey} />;
}

export default Loading;
