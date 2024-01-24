'use client';

import React, { useCallback, useState } from 'react';

import { CollectionUtils } from '@/lib/model';

import DatasetBody from './DatasetBody';
import DatasetHeader from './DatasetHeader';

interface DatasetProps {
  title: string;
  initialCollectionKey: CollectionUtils.Key;
  initialDataset: object[];
}

function Dataset({
  title,
  initialCollectionKey,
  initialDataset,
}: DatasetProps) {
  const [isHeaderSticky, setHeaderSticky] = useState(false);

  const handleBodyRef = useCallback((el: HTMLDivElement | null) => {
    if (el !== null) {
      // 뷰포트보다 바디(데이터 출력 영역)의 높이가 커질 경우. 즉, 스크롤이 발생하면 헤더 영역의 position을 sticky로 지정한다.
      const overflowsViewport = el.scrollHeight > window.screen.height;
      setHeaderSticky(overflowsViewport);
    }
  }, []);

  return (
    <>
      <DatasetHeader
        title={title}
        dataset={initialDataset}
        isSticky={isHeaderSticky}
      />
      <DatasetBody
        ref={handleBodyRef}
        initialCollectionKey={initialCollectionKey}
        initialDataset={{
          [initialCollectionKey]: initialDataset,
        }}
      />
    </>
  );
}

export default Dataset;
