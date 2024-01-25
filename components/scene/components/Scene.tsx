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
import PlayerButton from './PlayerButton';
import { useScenePlayer } from './Scene.hooks';
import SceneBody from './SceneBody';
import SceneHeader from './SceneHeader';
import SceneOverview from './SceneOverview';
import SceneRoot from './SceneRoot';

interface SceneProps {
  sceneId: string;
  sceneIdx: number;
  sceneData: SceneData;
  sceneLength: number;
  isActive: boolean;
  isDisabled: boolean;
  onPlay: (sceneIdx: number) => void;
  onStop: () => void;
}

function Scene({
  sceneId,
  sceneIdx,
  sceneData,
  sceneLength,
  isActive,
  isDisabled,
  onPlay,
  onStop,
}: SceneProps) {
  const { isPlaying, bitDurationAsSecond, handleScenePlayer } = useScenePlayer(
    sceneIdx,
    onPlay,
    onStop
  );

  const [isHovering, setHovering] = useState(false);

  return (
    <SceneRoot
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
      <SceneHeader className="flex flex-row-reverse items-center gap-2">
        {({ bits }) => (
          <>
            <h2 className="flex-1 truncate font-mono text-xs">
              {sceneData.display.dates[0]}
            </h2>
            <PlayerButton
              isPlaying={isPlaying}
              className="flex-none"
              onClick={() => handleScenePlayer({ bits })}
            />
          </>
        )}
      </SceneHeader>

      <Bit.Provider>
        <HoverCard openDelay={0} closeDelay={0} open={isHovering}>
          <HoverCardTrigger asChild>
            <SceneBody
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
                            onHover={(bitIdx) =>
                              bitContext.setSelectedBitIdx(bitIdx)
                            }
                            onBlur={(_bitIdx) =>
                              bitContext.resetSelectedBitIdx()
                            }
                            className={cn(bit.isVacant && 'hidden')}
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
            </SceneBody>
          </HoverCardTrigger>

          <HoverCardContent
            sideOffset={10}
            align="start"
            className="w-auto min-w-80 bg-muted p-1 text-muted-foreground"
          >
            <SceneOverview />
          </HoverCardContent>
        </HoverCard>
      </Bit.Provider>
    </SceneRoot>
  );
}

export default Scene;
