'use client';

import React from 'react';

import { useLocaleDictionary } from '@/lib/i18n';
import { CollectionUtils } from '@/lib/model';
import { toLowerCase } from '@/lib/utils';
import { LayoutConsumer } from '@/components/layout';
import { Sequence, Sequence2 } from '@/components/sequence';

import {
  useDatasetParams,
  useSceneDataset,
  type InitialDataset,
} from './Dataset.hooks';

export interface DatasetBodyProps {
  initialCollectionKey: CollectionUtils.Key;
  initialDataset?: InitialDataset;
}

const DatasetBody = React.forwardRef<HTMLDivElement, DatasetBodyProps>(
  function DatasetBody({ initialCollectionKey, initialDataset }, _ref) {
    const { locale } = useLocaleDictionary();

    const { locationKey, dustKey, yearKey, monthKey, seasonKey } =
      useDatasetParams();

    const sceneDataset = useSceneDataset({
      initialDataset,
      initialCollectionKey,
      locationKey,
      dustKey,
      yearKey,
      monthKey,
      seasonKey,
      locale,
    });

    const sceneDatasetId = [
      initialCollectionKey,
      dustKey,
      yearKey,
      monthKey,
      seasonKey,
    ]
      .map((key) => toLowerCase(key))
      .join('-');

    if (!sceneDataset) return null;

    return (
      <LayoutConsumer>
        {(layoutContext) => {
          switch (layoutContext.key) {
            case 'SHORT':
              return (
                <Sequence2 id={sceneDatasetId} sceneDataset={sceneDataset} />
              );
            case 'DETAIL':
            default:
              return (
                <Sequence id={sceneDatasetId} sceneDataset={sceneDataset} />
              );
          }
        }}
      </LayoutConsumer>
    );
  }
);

export default DatasetBody;
