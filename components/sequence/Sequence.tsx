'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/css';
import { useTitle } from '@/lib/hooks';
import { Scene, SceneUtils, type SceneData } from '@/components/scene';

import PlayerButton from '../scene/components/PlayerButton';
import { useActiveScene } from './Sequence.hooks';

const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const baseOctave = 3;

interface SequenceProps {
  sequenceId: string;
  sceneDataset: SceneData[];
  className?: string;
}

function Sequence({ sequenceId, sceneDataset, className }: SequenceProps) {
  const values = sceneDataset.map((sceneData) => sceneData.value ?? 0);

  const title = useTitle();

  const [isPlaying, setPlaying] = useState(false);

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
      <header className="flex flex-row-reverse items-center gap-2 pb-4">
        <h2 className="text-base">{title}</h2>
        <PlayerButton isPlaying={isPlaying} onClick={() => {}} />
      </header>

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
