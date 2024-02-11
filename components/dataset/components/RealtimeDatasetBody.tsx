'use client';

import type { RealtimeData } from '@/domains';

import { useLocaleDictionary } from '@/lib/i18n';
import { toLowerCase } from '@/lib/utils';
import { SceneUtils } from '@/components/scene/lib';
import { Sequence3 } from '@/components/sequence';

import { useRealtimeDatasetParams } from './RealtimeDataset.hooks';

interface RealtimeDatasetBodyProps {
  initialDataset: RealtimeData[];
  revalidate: () => Promise<void>;
}

function RealtimeDatasetBody({
  initialDataset,
  revalidate,
}: RealtimeDatasetBodyProps) {
  const { locale } = useLocaleDictionary();

  const { dustKey, locationKey } = useRealtimeDatasetParams();

  const sceneDataset = SceneUtils.toRealtimeSceneDataset<RealtimeData>({
    dataset: initialDataset,
    dustKey,
    locationKey,
    locale,
    setValue: (data, dustKey) =>
      dustKey === 'PM_LARGE' ? data.pm_large : data.pm_small,
  });

  const sceneDatasetId = [locationKey, dustKey].map(toLowerCase).join('-');

  return (
    <Sequence3
      id={sceneDatasetId}
      sceneDataset={sceneDataset}
      revalidate={revalidate}
    />
  );
}

export default RealtimeDatasetBody;
