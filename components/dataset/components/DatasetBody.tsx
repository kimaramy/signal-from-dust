'use client';

import React from 'react';

import { useLocaleDictionary } from '@/lib/i18n';
import { CollectionUtils } from '@/lib/model';
import { toLowerCase } from '@/lib/utils';
import { LayoutConsumer } from '@/components/layout';
import { Sequence } from '@/components/sequence';

import { useDatasetOrderContext } from '../lib';
import {
  useDatasetParams,
  useSceneContents,
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

    const { key: datasetOrderKey } = useDatasetOrderContext();

    const sceneDataset = useSceneDataset({
      initialDataset,
      datasetOrderKey,
      initialCollectionKey,
      locationKey,
      dustKey,
      yearKey,
      monthKey,
      seasonKey,
      locale,
    });

    const { createSceneTitle, createSceneSubtitle, createSceneDescription } =
      useSceneContents();

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
        {(layoutContext) => (
          <Sequence
            id={sceneDatasetId}
            sceneDataset={sceneDataset}
            createSceneTitle={createSceneTitle}
            createSceneSubtitle={createSceneSubtitle}
            createSceneDescription={createSceneDescription}
            layoutKey={layoutContext.key}
          />
        )}
      </LayoutConsumer>
    );
  }
);

export default DatasetBody;
