'use client';

import React from 'react';
import type { RealtimeData } from '@/domains';

import { useLocaleDictionary } from '@/lib/i18n';
import { toLowerCase } from '@/lib/utils';
import { useDustKey } from '@/components/dust';
import { useLocationKey } from '@/components/location';
import { SceneUtils } from '@/components/scene';
import { ScreenSequence } from '@/components/sequence';

interface RealtimeDatasetBodyProps {
  initialDataset: RealtimeData[];
  revalidate: () => void;
}

function RealtimeDatasetBody({
  initialDataset,
  revalidate,
}: RealtimeDatasetBodyProps) {
  const { locale } = useLocaleDictionary();

  const locationKey = useLocationKey('query');

  const dustKey = useDustKey('query');

  const realtimeSceneDataset = SceneUtils.toRealtimeSceneDataset<RealtimeData>({
    dataset: initialDataset ?? [],
    dustKey,
    locationKey,
    locale,
    getPMLarge: (data) => data.PM10,
    getPMSmall: (data) => data.PM25,
  });

  const realtimeSceneDatasetId = [locationKey, dustKey]
    .map((key) => toLowerCase(key))
    .join('-');

  return (
    <ScreenSequence
      sequenceId={realtimeSceneDatasetId}
      sceneDataset={realtimeSceneDataset}
      revalidate={revalidate}
    />
  );
}

export default RealtimeDatasetBody;
