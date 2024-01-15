'use client';

import React, { useState } from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Bit, BitUtils } from '@/components/bit';

import type { SceneData } from '../context';
import PlayerButton from './PlayerButton';
import SceneBody from './SceneBody';
import SceneHeader from './SceneHeader';
import SceneOverview from './SceneOverview';
import SceneRoot from './SceneRoot';

interface SceneProps {
  sceneId: string;
  sceneIdx: number;
  sceneData: SceneData;
  sceneLength: number;
}

function Scene({ sceneId, sceneIdx, sceneData, sceneLength }: SceneProps) {
  const [isHovering, setHovering] = useState(false);

  return (
    <SceneRoot
      id={sceneId}
      sceneIdx={sceneIdx}
      sceneData={sceneData}
      className="group"
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      <SceneHeader>
        {({ isPlaying, setPlaying }) => (
          <div className="flex items-center gap-1.5">
            <PlayerButton
              isPlaying={isPlaying}
              className="flex-none"
              onClick={() => setPlaying(!isPlaying)}
            />
            <p className="flex-1 truncate font-mono text-xs">
              {sceneData.dates[0]}
            </p>
          </div>
        )}
      </SceneHeader>

      <HoverCard openDelay={0} closeDelay={0} open={isHovering}>
        <HoverCardTrigger asChild>
          <SceneBody columns={sceneLength} className="group-hover:ring-1">
            {({ bits, isPlaying, setActiveBitIdx, resetActiveBitIdx }) =>
              bits.map((bit, bitIdx) => {
                const bitId = BitUtils.getBitId(sceneId, bitIdx);
                return (
                  <Bit
                    key={bitId}
                    bit={bit}
                    bitId={bitId}
                    bitIdx={bitIdx}
                    isActive={isPlaying}
                    onMouseOver={(bitIdx) => setActiveBitIdx(bitIdx)}
                    onMouseOut={() => resetActiveBitIdx()}
                  />
                );
              })
            }
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
    </SceneRoot>
  );
}

export default Scene;
