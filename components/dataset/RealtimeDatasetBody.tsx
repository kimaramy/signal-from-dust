'use client';

import React from 'react';
import type { RealtimeData } from '@/domains';

import { useLocaleDictionary } from '@/lib/i18n';
import { toLowerCase } from '@/lib/utils';
import { useDustKey } from '@/components/dust';
import { useLocationKey } from '@/components/location';
import { SceneUtils } from '@/components/scene';
import { RealtimeSequence } from '@/components/sequence';

interface RealtimeDatasetBodyProps {
  initialDataset: RealtimeData[];
  revalidate: () => Promise<void>;
}

function RealtimeDatasetBody({
  initialDataset,
  revalidate,
}: RealtimeDatasetBodyProps) {
  const { locale } = useLocaleDictionary();

  const locationKey = useLocationKey('query');

  const dustKey = useDustKey('query');

  const sceneDataset = SceneUtils.toRealtimeSceneDataset<RealtimeData>({
    dataset: initialDataset,
    dustKey,
    locationKey,
    locale,
    setValue: (data, dustKey) =>
      dustKey === 'PM_LARGE' ? data.PM10 : data.PM25,
  });

  const sceneDatasetId = [locationKey, dustKey].map(toLowerCase).join('-');

  return (
    <RealtimeSequence
      id={sceneDatasetId}
      sceneDataset={sceneDataset}
      revalidate={revalidate}
    />
  );
}

export default RealtimeDatasetBody;
