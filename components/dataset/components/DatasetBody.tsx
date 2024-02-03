'use client';

import React from 'react';

import { useLocaleDictionary } from '@/lib/i18n';
import { CollectionUtils } from '@/lib/model';
import { toLowerCase } from '@/lib/utils';
import { useDustKey } from '@/components/dust';
import { LayoutConsumer } from '@/components/layout';
import { useLocationKey } from '@/components/location';
import { useMonthKey } from '@/components/month';
import { useSeasonKey } from '@/components/season';
import { Sequence, Sequence2 } from '@/components/sequence';
import { useYearKey } from '@/components/year';

import { useSceneDataset, type InitialDataset } from './Dataset.hooks';

export interface DatasetBodyProps {
  initialCollectionKey: CollectionUtils.Key;
  initialDataset?: InitialDataset;
}

const DatasetBody = React.forwardRef<HTMLDivElement, DatasetBodyProps>(
  function DatasetBody({ initialCollectionKey, initialDataset }, _ref) {
    const { locale } = useLocaleDictionary();

    const locationKey = useLocationKey('query');

    const dustKey = useDustKey('query');

    const yearKey = useYearKey('query');

    const seasonKey = useSeasonKey('query');

    const monthKey = useMonthKey('query');

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
            case 'GRID':
              return (
                <Sequence2 id={sceneDatasetId} sceneDataset={sceneDataset} />
              );
            case 'LIST':
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
