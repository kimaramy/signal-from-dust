'use client';

import React from 'react';

import { SafeArea } from '@/components/ui/safe-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import Scene from './Scene';
import type { SceneViewProps } from './SceneItemView';

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
  onPause,
}: SceneViewProps) {
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
      <Scene.Player
        sceneIdx={sceneIdx}
        isActive={isActive}
        onPlay={onPlay}
        onStop={onStop}
        onPause={onPause}
      >
        {({ isPlaying, isPaused, handlePlayer, handleStop }) => (
          <Sheet
            onOpenChange={(isOpen) => {
              // console.log(`isOpen: `, isOpen);
              !isOpen && handleStop();
            }}
            modal={false}
          >
            <SheetTrigger asChild>
              <Scene.Card
                view="standalone"
                state={isActive ? 'active' : undefined}
                title={_sceneTitle}
                subtitle={_sceneSubtitle}
                isPlayerDisabled={isPlaying || isActive}
                isPlaying={isPlaying}
                isPaused={isPaused}
                onTogglePlay={handlePlayer}
              />
            </SheetTrigger>

            <SheetContent
              className="rounded-t-2xl px-4 pt-4 pb-safe-offset-3"
              side="bottom"
              hasCloseButton={false}
            >
              <SafeArea>
                <Scene.Overview className="mb-4 justify-between sm:hidden sm:justify-start sm:space-x-4">
                  <Scene.Card
                    className="truncate p-0"
                    title={_sceneTitle}
                    subtitle={_sceneSubtitle}
                    isPlaying={isPlaying}
                    isPaused={isPaused}
                    onTogglePlay={handlePlayer}
                  />
                  <div className="flex-none self-stretch pl-2 sm:pl-4">
                    <Scene.Value
                      isUnitHidden
                      className="inline-flex h-full items-center justify-center px-2 text-[1.2em] sm:aspect-square sm:text-[1.6em]"
                    />
                  </div>
                </Scene.Overview>
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
