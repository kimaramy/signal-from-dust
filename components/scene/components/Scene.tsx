'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/css';
import { Instrument, Tone } from '@/lib/tone';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Bit, BitOverlay, BitUtils } from '@/components/bit';

import type { SceneData } from '../context';
import PlayerButton from './PlayerButton';
import SceneBody from './SceneBody';
import SceneHeader, { type SceneHeaderContext } from './SceneHeader';
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
  const [bitDurationAsSecond] = useState(0.5);

  const [isHovering, setHovering] = useState(false);

  const [isPlaying, setPlaying] = useState(false);

  const [claps, setClaps] = useState<Tone.Sequence | null>(null);
  const [kicks, setKicks] = useState<Tone.Sequence | null>(null);

  const handlePlayer = useCallback(
    async ({ bits }: SceneHeaderContext) => {
      await Tone.start();
      if (!isPlaying && Tone.Transport.state !== 'started') {
        const claps = new Tone.Sequence(
          (time) => {
            Instrument.createClap().triggerAttackRelease(time);
          },
          bits.map((bit) => (bit.value === '0' ? '0' : null)),
          bitDurationAsSecond
        ).start(0);
        const kicks = new Tone.Sequence(
          (time) => {
            Instrument.createKick().triggerAttackRelease('D1', time);
          },
          bits.map((bit) => (bit.value === '1' ? '1' : null)),
          bitDurationAsSecond
        ).start(0);
        setClaps(claps);
        setKicks(kicks);
        Tone.Transport.start();
      } else {
        claps?.stop();
        kicks?.stop();
        Tone.Transport.stop();
      }
      setPlaying(!isPlaying);
    },
    [isPlaying, claps, kicks, bitDurationAsSecond]
  );

  useEffect(() => {
    if (isPlaying && Tone.Transport.state === 'started') {
      onPlay(sceneIdx);
    } else {
      onStop();
    }
  }, [isPlaying]);

  return (
    <SceneRoot
      id={sceneId}
      sceneIdx={sceneIdx}
      sceneData={sceneData}
      isActive={isActive}
      isDisabled={isDisabled}
      className="group"
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      <SceneHeader>
        {({ bits }) => (
          <div className="flex items-center gap-2">
            <PlayerButton
              isPlaying={isPlaying}
              className="flex-none"
              onClick={() => {
                handlePlayer({ bits });
              }}
            />
            <p className="flex-1 truncate font-mono text-xs">
              {sceneData.display.dates[0]}
            </p>
          </div>
        )}
      </SceneHeader>

      <HoverCard openDelay={0} closeDelay={0} open={isHovering}>
        <HoverCardTrigger asChild>
          <SceneBody
            columns={sceneLength}
            isPlaying={isPlaying}
            intervalSecond={bitDurationAsSecond}
            className="group-hover:ring-1"
          >
            {({ bits, setActiveBitIdx, resetActiveBitIdx }) =>
              bits.map((bit) => {
                const bitId = BitUtils.getBitId(sceneId, bit.idx);
                return (
                  <li key={bitId} className="relative h-full">
                    <Bit
                      bitId={bitId}
                      bitIdx={bit.idx}
                      bit={bit.value}
                      isSceneActive={isPlaying}
                      onMouseOver={(bitIdx) => setActiveBitIdx(bitIdx)}
                      onMouseOut={() => resetActiveBitIdx()}
                    />
                    <BitOverlay
                      className={cn(bit.isActive ? 'visible' : 'invisible')}
                    />
                  </li>
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
