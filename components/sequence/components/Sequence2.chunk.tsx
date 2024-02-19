'use client';

import React from 'react';

import { SceneScreenView } from '@/components/scene';
import { SceneUtils } from '@/components/scene/lib';

import type { SequenceProps } from './Sequence';

function Sequence2(props: SequenceProps) {
  const {
    id,
    sceneDataset,
    createSceneTitle,
    createSceneSubtitle,
    createSceneDescription,
    revalidate,
  } = props;

  const values = sceneDataset.map((sceneData) => sceneData.value ?? 0);

  const sceneLength = SceneUtils.getSceneLength(Math.max(...values));

  return (
    <article
      id={id}
      className="h-auto w-full min-w-md overflow-scroll scrollbar-hide"
    >
      {sceneDataset.map((sceneData, sceneIdx) => {
        const sceneId = SceneUtils.getSceneId(id, sceneData.id);
        return (
          <SceneScreenView
            key={sceneId}
            sceneId={sceneId}
            sceneIdx={sceneIdx}
            sceneData={sceneData}
            sceneLength={sceneLength}
            sceneTitle={createSceneTitle}
            sceneSubtitle={createSceneSubtitle}
            sceneDescription={createSceneDescription}
            revalidate={revalidate}
          />
        );
      })}
    </article>
  );
}

export default Sequence2;
