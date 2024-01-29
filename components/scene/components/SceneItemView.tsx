'use client';

import React, { useState } from 'react';

import { cn } from '@/lib/css';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Bit, BitUtils } from '@/components/bit';

import type { SceneData } from '../context';
import { PlayerButton } from './PlayerButton';
import Scene from './Scene';

export interface SceneItemViewProps {
  sceneId: string;
  sceneIdx: number;
  sceneData: SceneData;
  sceneLength: number;
  sceneTitle: React.ReactNode | ((sceneData: SceneData) => React.ReactNode);
  sceneSubtitle: React.ReactNode | ((sceneData: SceneData) => React.ReactNode);
  sceneDescription?:
    | React.ReactNode
    | ((sceneData: SceneData) => React.ReactNode);
  isActive: boolean;
  isDisabled: boolean;
  onPlay: (sceneIdx: number) => void;
  onStop: () => void;
}

function SceneItemView({
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
}: SceneItemViewProps) {
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

  const [isHovering, setHovering] = useState(false);

  return (
    <Scene.Root
      id={sceneId}
      sceneIdx={sceneIdx}
      sceneData={sceneData}
      sceneLength={sceneLength}
      isActive={isActive}
      isDisabled={isDisabled}
      className="group"
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      <Scene.Player sceneIdx={sceneIdx} onPlay={onPlay} onStop={onStop}>
        {({ isPlaying, handlePlayer, bitDurationAsSecond }) => (
          <>
            <Scene.Head className="flex flex-row-reverse items-center gap-2">
              {({ bits }) => (
                <>
                  <span className="flex-1 truncate font-mono text-xs">
                    {sceneData.display.dates[0]}
                  </span>
                  <PlayerButton
                    isPlaying={isPlaying}
                    className="flex-none"
                    onClick={() => handlePlayer({ bits })}
                  />
                </>
              )}
            </Scene.Head>

            <Bit.Provider>
              <HoverCard openDelay={0} closeDelay={0} open={isHovering}>
                <HoverCardTrigger asChild>
                  <Scene.Body
                    view="listitem"
                    columns={sceneLength}
                    isPlaying={isPlaying}
                    intervalSecond={bitDurationAsSecond}
                    className="group-hover:ring-1"
                  >
                    {(sceneContext) => (
                      <Bit.Consumer>
                        {(bitContext) =>
                          sceneContext.bits.map((bit, bitIdx) => {
                            const bitId = BitUtils.getBitId(sceneId, bitIdx);
                            return (
                              <li key={bitId} className="relative h-full">
                                <Bit.View
                                  view="2d"
                                  bitId={bitId}
                                  bitIdx={bitIdx}
                                  bit={bit.value}
                                  isActive={isPlaying}
                                  className={cn(bit.isVacant && 'hidden')}
                                  onHover={(bitIdx) => {
                                    bitContext.setSelectedBitIdx(bitIdx);
                                  }}
                                  onBlur={(_bitIdx) => {
                                    bitContext.resetSelectedBitIdx();
                                  }}
                                />
                                <Bit.Overlay
                                  className={cn(
                                    bit.isActive ? 'visible' : 'invisible'
                                  )}
                                />
                              </li>
                            );
                          })
                        }
                      </Bit.Consumer>
                    )}
                  </Scene.Body>
                </HoverCardTrigger>

                <HoverCardContent
                  sideOffset={10}
                  align="start"
                  className="w-auto min-w-80 bg-muted p-2 text-muted-foreground"
                >
                  <Scene.Overview>
                    <Scene.Card
                      className="p-2"
                      title={_sceneTitle}
                      subtitle={_sceneSubtitle}
                      isPlayerHidden
                      onPlay={handlePlayer}
                    />
                    <div className="space-y-2 p-2">
                      <Scene.Description>{_sceneDescription}</Scene.Description>
                      <Scene.Value />
                    </div>
                  </Scene.Overview>
                </HoverCardContent>
              </HoverCard>
            </Bit.Provider>
          </>
        )}
      </Scene.Player>
    </Scene.Root>
  );
}

export default SceneItemView;