'use client';

import React, { useEffect } from 'react';

import { cn } from '@/lib/css';
import { Scene, SceneUtils, type SceneData } from '@/components/scene';

import { useActiveScene } from './Sequence.hooks';

interface SequenceProps {
  sequenceId: string;
  sceneDataset: SceneData[];
  className?: string;
}

function Sequence({ sequenceId, sceneDataset, className }: SequenceProps) {
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
    <article
      id={sequenceId}
      className={cn(
        'grid h-full min-h-screen w-full min-w-md content-center items-center gap-2 overflow-auto overflow-y-scroll p-4 scrollbar-hide',
        className
      )}
      style={{
        gridTemplateRows: `repeat(${sceneDataset.length}, 2.25rem)`,
      }}
    >
      {sceneDataset.map((sceneData, sceneIdx) => {
        const sceneId = SceneUtils.getSceneId(sequenceId, sceneData.id);
        return (
          <Scene
            key={sceneId}
            sceneId={sceneId}
            sceneIdx={sceneIdx}
            sceneData={sceneData}
            sceneLength={SceneUtils.getSceneLength(Math.max(...values))}
            isActive={activeSceneIdx === sceneIdx}
            isDisabled={validateOtherSceneActive(sceneIdx)}
            onPlay={setActiveSceneIdx}
            onStop={resetActiveSceneIdx}
          />
        );
      })}
    </article>
  );
}

export default Sequence;
