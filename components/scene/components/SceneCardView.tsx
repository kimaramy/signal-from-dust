'use client';

import React from 'react';

import { SafeArea } from '@/components/ui/safe-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import Scene from './Scene';
import type { SceneItemViewProps as SceneCardViewProps } from './SceneItemView';

function SceneCardView({
  sceneId,
  sceneIdx,
  sceneData,
  sceneLength,
  sceneTitle,
  sceneSubtitle,
  sceneDescription,
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

  const _sceneDescription =
    typeof sceneDescription === 'function'
      ? sceneDescription(sceneData)
      : sceneDescription;

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
        {({ isPlaying, handlePlayer, handleStop }) => (
          <Sheet
            open={isPlaying}
            onOpenChange={() => handleStop()}
            modal={false}
          >
            <SheetTrigger asChild>
              <Scene.Card
                variant="isolated"
                title={_sceneTitle}
                subtitle={_sceneSubtitle}
                isPlaying={isPlaying}
                onPlay={handlePlayer}
              />
            </SheetTrigger>

            <SheetContent
              className="px-4 py-3"
              side="bottom"
              hasCloseButton={false}
            >
              <SafeArea>
                <Scene.Bits className="h-8" />
              </SafeArea>
            </SheetContent>
          </Sheet>
        )}
      </Scene.Player>
    </Scene.Root>
  );
}

export default SceneCardView;
