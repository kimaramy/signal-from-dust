'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

import { cn } from '@/lib/css';
import { Skeleton } from '@/components/ui/skeleton';
import { Grid } from '@/components/layout';
import { SceneUtils, type SceneData } from '@/components/scene';

const Scene = dynamic(() => import('@/components/scene/components/Scene'), {
  loading: () => <Skeleton className="h-full w-full" />,
});

interface SequenceProps {
  sequenceId: string;
  sceneDataset: SceneData[];
  className?: string;
}

function Sequence({ sequenceId, sceneDataset, className }: SequenceProps) {
  const ref = useRef<HTMLUListElement>(null);

  const values = sceneDataset.map((sceneData) => sceneData.value ?? 0);

  useEffect(() => {
    window?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [sceneDataset]);

  return (
    <Grid
      id={sequenceId}
      ref={ref}
      className={cn('h-full', className)}
      items={sceneDataset}
      itemKey={(sceneData) => SceneUtils.getSceneId(sequenceId, sceneData.id)}
      renderItem={(sceneData, sceneDataIdx) => (
        <Scene
          sceneId={SceneUtils.getSceneId(sequenceId, sceneData.id)}
          sceneIdx={sceneDataIdx}
          sceneData={sceneData}
          sceneLength={SceneUtils.getSceneLength(Math.max(...values))}
        />
      )}
    />
  );
}

export default Sequence;
