'use client';

import { LayoutUtils } from '@/components/layout';
import { SceneCardView, SceneItemView, SceneList } from '@/components/scene';
import { SceneUtils, type SceneData } from '@/components/scene/lib';

import { useActiveScene } from './Sequence.hooks';

export interface SequenceProps {
  id: string;
  sceneDataset: SceneData[];
  createSceneTitle: (sceneData: SceneData) => string;
  createSceneSubtitle: (sceneData: SceneData) => string;
  createSceneDescription?: (sceneData: SceneData) => string;
  revalidate?: () => Promise<void>;
  layoutKey?: LayoutUtils.Key;
}

function Sequence({
  id,
  sceneDataset,
  createSceneTitle,
  createSceneSubtitle,
  createSceneDescription,
  layoutKey = LayoutUtils.schema.defaultKey,
}: SequenceProps) {
  const values = sceneDataset.map((sceneData) => sceneData.value ?? 0);

  const sceneLength = SceneUtils.getSceneLength(Math.max(...values));

  const {
    activeSceneIdx,
    setActiveSceneIdx,
    resetActiveSceneIdx,
    validateOtherSceneActive,
  } = useActiveScene();

  return (
    <SceneList id={id} layoutKey={layoutKey} sceneDataset={sceneDataset}>
      {(sceneDataset) =>
        sceneDataset.map((sceneData, sceneIdx) => {
          const sceneId = SceneUtils.getSceneId(id, sceneData.id);
          const isActive = activeSceneIdx === sceneIdx;
          const isDisabled = validateOtherSceneActive(sceneIdx);
          if (layoutKey === 'SHORT') {
            return (
              <SceneCardView
                key={sceneId}
                sceneId={sceneId}
                sceneIdx={sceneIdx}
                sceneData={sceneData}
                sceneLength={sceneLength}
                sceneTitle={createSceneTitle}
                sceneSubtitle={createSceneSubtitle}
                sceneDescription={createSceneDescription}
                isActive={isActive}
                isDisabled={isDisabled}
                onPlay={setActiveSceneIdx}
                onStop={resetActiveSceneIdx}
                onPause={resetActiveSceneIdx}
              />
            );
          }
          return (
            <SceneItemView
              key={sceneId}
              sceneId={sceneId}
              sceneIdx={sceneIdx}
              sceneData={sceneData}
              sceneLength={sceneLength}
              sceneTitle={createSceneTitle}
              sceneSubtitle={createSceneSubtitle}
              sceneDescription={createSceneDescription}
              isActive={isActive}
              isDisabled={isDisabled}
              onPlay={setActiveSceneIdx}
              onStop={resetActiveSceneIdx}
            />
          );
        })
      }
    </SceneList>
  );
}

export default Sequence;
