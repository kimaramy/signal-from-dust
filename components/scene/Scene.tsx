'use client';

import React, { useCallback, useState } from 'react';

import { Icon } from '@/lib/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Bit, BitUtils } from '@/components/bit';
import { toggleSoundPlay } from '@/components/sound';

import SceneLayout from './SceneLayout';
import SceneOverview from './SceneOverview';
import SceneRoot, { type SceneRootProps } from './SceneRoot';
import StackScene from './StackScene';
import type { SceneData } from './utils';

export interface SceneProps extends SceneRootProps {
  sceneId: string;
  sceneIdx: number;
  sceneData: SceneData;
  sceneLength: number;
}

function Scene({
  sceneId,
  sceneIdx,
  sceneData,
  sceneLength,
  ...rest
}: SceneProps) {
  const bits = BitUtils.toBits(sceneData.value);

  const [isOpen, setOpen] = useState(false);

  const [isPlaying, setPlaying] = useState(false);

  const handlePlaySound = useCallback(() => {
    if (bits) {
      toggleSoundPlay(bits, {
        onStart() {
          setPlaying(true);
        },
        onStop() {
          setPlaying(false);
        },
      });
    }
  }, [bits]);

  return (
    <>
      <SceneRoot id={sceneId} {...rest}>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <div
              role="presentation"
              style={{ width: `min(8rem, 12vw)` }}
              className="peer flex h-full flex-none cursor-pointer flex-nowrap items-center justify-start gap-1"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 flex-none"
                onClick={() => {
                  setOpen(true);
                  // if (isPlaying) {
                  //   handlePlaySound();
                  //   stopSoundPlay();
                  // } else {
                  //   handlePlaySound();
                  // }
                }}
              >
                {isPlaying ? (
                  <Icon.Pause aria-label="Pause" className="h-3.5 w-3.5" />
                ) : (
                  <Icon.Play aria-label="Play" className="h-3.5 w-3.5" />
                )}
              </Button>
              <p className="flex-1 truncate font-mono text-xs">
                {sceneData.dates[0]}
              </p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-auto min-w-80 bg-muted p-1 text-muted-foreground"
          >
            <SceneOverview
              bits={bits ?? []}
              sceneData={sceneData}
              isPlaying={isPlaying}
              onPlayButtonClick={handlePlaySound}
            />
          </HoverCardContent>
        </HoverCard>

        <SceneLayout
          bits={bits ?? []}
          columns={sceneLength}
          className="data-[state=open]:ring-1"
        >
          {(bits) =>
            bits.map((bit, bitIdx) => {
              const bitId = BitUtils.getBitId(sceneId, bitIdx);
              return (
                <Bit
                  key={bitId}
                  bit={bit}
                  bitId={bitId}
                  bitIdx={bitIdx}
                  active={isPlaying}
                />
              );
            })
          }
        </SceneLayout>
      </SceneRoot>

      <Dialog open={isOpen} onOpenChange={() => setOpen((isOpen) => !isOpen)}>
        <DialogContent className="aspect-video min-w-[75vw] overflow-hidden bg-body">
          <StackScene
            sceneId={sceneId}
            sceneIdx={sceneIdx}
            sceneData={sceneData}
            className="h-full w-full"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Scene;
