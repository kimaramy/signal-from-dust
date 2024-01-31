'use client';

import React, { useCallback, useState } from 'react';

import { LayoutProvider } from '@/components/layout';

import DatasetBody, { type DatasetBodyProps } from './DatasetBody';
import DatasetHeader from './DatasetHeader';

interface DatasetProps extends Omit<DatasetBodyProps, 'initialDataset'> {
  title: string;
  initialDataset: object[];
}

function Dataset({
  title,
  initialCollectionKey,
  initialDataset,
}: DatasetProps) {
  const [isHeaderSticky, setHeaderSticky] = useState(false);

  const handleBodyRef = useCallback((el: HTMLDivElement | null) => {
    // 데이터 출력 영역의 높이가 뷰포트보다 커질 경우 스크롤이 발생하며, 이때 헤더 영역의 position을 sticky로 지정한다.
    if (el !== null) {
      // console.log(el.getBoundingClientRect());
      setHeaderSticky(el.scrollHeight > window.screen.height);
    }
  }, []);

  return (
    <LayoutProvider>
      <DatasetHeader
        title={title}
        dataset={initialDataset}
        isSticky={isHeaderSticky}
      />
      <DatasetBody
        ref={handleBodyRef}
        initialCollectionKey={initialCollectionKey}
        initialDataset={{ [initialCollectionKey]: initialDataset }}
      />
    </LayoutProvider>
  );
}

export default Dataset;
