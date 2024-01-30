'use client';

import React from 'react';

import Scene from './Scene';
import type { SceneItemViewProps as SceneCardViewProps } from './SceneItemView';

function SceneCardView({
  sceneId,
  sceneIdx,
  sceneData,
  sceneLength,
  sceneTitle,
  sceneSubtitle,
  isActive,
  isDisabled,
  onPlay,
  onStop,
}: SceneCardViewProps) {
  const _sceneTitle =
    typeof sceneTitle === 'function' ? sceneTitle(sceneData) : sceneTitle;

  const _sceneSubtitle =
    typeof sceneSubtitle === 'function'
      ? sceneSubtitle(sceneData)
      : sceneSubtitle;

  return (
    <Scene.Root
      id={sceneId}
      sceneIdx={sceneIdx}
      sceneData={sceneData}
      sceneLength={sceneLength}
      isActive={isActive}
      isDisabled={isDisabled}
    >
      <Scene.Player sceneIdx={sceneIdx} onPlay={onPlay} onStop={onStop}>
        {({ isPlaying, handlePlayer }) => (
          <Scene.Card
            variant="isolated"
            title={_sceneTitle}
            subtitle={_sceneSubtitle}
            isPlaying={isPlaying}
            onPlay={handlePlayer}
          />
        )}
      </Scene.Player>
    </Scene.Root>
  );
}

export default SceneCardView;
