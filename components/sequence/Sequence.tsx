'use client';

import React, { useEffect, useRef } from 'react';

import { cn } from '@/lib/css';
import { Grid } from '@/components/layout';
import { Scene, SceneUtils, type SceneData } from '@/components/scene';

import { useActiveScene } from './Sequence.hooks';

interface SequenceProps {
  sequenceId: string;
  sceneDataset: SceneData[];
  className?: string;
}

function Sequence({ sequenceId, sceneDataset, className }: SequenceProps) {
  const ref = useRef<HTMLUListElement>(null);

  const values = sceneDataset.map((sceneData) => sceneData.value ?? 0);

  const {
    activeSceneIdx,
    setActiveSceneIdx,
    resetActiveSceneIdx,
    validateOtherSceneActive,
  } = useActiveScene();

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
      className={cn('h-full min-w-md overflow-auto', className)}
      items={sceneDataset}
      itemKey={(sceneData) => SceneUtils.getSceneId(sequenceId, sceneData.id)}
      renderItem={(sceneData, sceneIdx) => (
        <Scene
          sceneId={SceneUtils.getSceneId(sequenceId, sceneData.id)}
          sceneIdx={sceneIdx}
          sceneData={sceneData}
          sceneLength={SceneUtils.getSceneLength(Math.max(...values))}
          isActive={activeSceneIdx === sceneIdx}
          isDisabled={validateOtherSceneActive(sceneIdx)}
          onPlay={setActiveSceneIdx}
          onStop={resetActiveSceneIdx}
        />
      )}
    />
  );
}

export default Sequence;
