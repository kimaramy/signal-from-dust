'use client';

import React, { useCallback, useRef, useState } from 'react';
import { PauseIcon, PlayIcon } from '@heroicons/react/20/solid';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
// import Overlay from './Overlay';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { type DisplayKey } from '@/components/display';
import { stopSoundPlay, toggleSoundPlay } from '@/components/sound';

import Bit, { Binary } from './Bit';
import SceneDataView from './SceneDataView';
import SceneRoot from './SceneRoot';

export function getSceneLength(decimal: number) {
  return decimal.toString(2).length;
}

export interface SceneData {
  id: number;
  name: string;
  displayName: string;
  value: number | null;
  collection: string;
  dates: string[];
  location: string;
  rank: number | null;
}

export interface SceneProps {
  displayKey: DisplayKey;
  sceneId: string;
  sceneData: SceneData;
  sceneIndex: number;
  sceneLength?: number;
  active?: boolean;
  className?: string;
  onSceneChange: (sceneData: SceneData, sceneIndex: number) => void;
}

function Scene({
  displayKey,
  sceneId,
  sceneData,
  sceneIndex,
  sceneLength = 8,
  active = false,
  className,
  onSceneChange,
}: SceneProps) {
  const isFullPage = displayKey === 'FULL';

  const binaries = sceneData.value?.toString(2).split('') as
    | Binary[]
    | undefined;

  const sceneRef = useRef<HTMLUListElement>(null);

  const { ref } = useInView({
    threshold: 0.8,
    initialInView: sceneIndex === 0,
    skip: !isFullPage,
    onChange(inView) {
      if (inView) {
        onSceneChange(sceneData, sceneIndex);
      } else {
        handleStopSound();
      }
    },
  });

  const [isPlaying, setPlaying] = useState(false);

  const [isMouseOver, setMouseOver] = useState(false);

  const handlePlaySound = useCallback(() => {
    if (binaries) {
      toggleSoundPlay(binaries.map(Number), {
        onStart() {
          setPlaying(true);
          setMouseOver(true);
        },
        onStop() {
          setPlaying(false);
          setMouseOver(false);
        },
      });
    }
  }, [binaries]);

  const handleStopSound = useCallback(() => {
    stopSoundPlay(() => setPlaying(false));
  }, []);

  const handleMouseOver = useCallback<React.MouseEventHandler>(() => {
    if (!isFullPage) {
      onSceneChange(sceneData, sceneIndex);
      // handleStopSound();
    }
    setMouseOver(true);
  }, [isFullPage, sceneData]);

  const handleMouseOut = useCallback<React.MouseEventHandler>(() => {
    setMouseOver(false);
  }, []);

  const handleOverlayClick = useCallback<React.MouseEventHandler>(() => {
    setPlaying((isPlaying) => !isPlaying);
  }, []);

  return (
    <SceneRoot
      ref={ref}
      id={sceneId}
      className={className}
      justify={isFullPage ? 'center' : 'start'}
      // style={{
      //   perspective: display === '3d' ? `1500px` : undefined,
      // }}
    >
      {isFullPage && (
        <div
          className={cn(
            'absolute bottom-[8%] left-[4%] z-20 w-auto min-w-80 bg-muted text-muted-foreground'
          )}
        >
          <SceneDataView
            displayKey={displayKey}
            sceneData={sceneData}
            binaries={binaries}
            isPlaying={isPlaying}
            onPlayButtonClick={handlePlaySound}
          />
        </div>
      )}
      {!isFullPage && (
        <HoverCard
          openDelay={0}
          closeDelay={0}
          // onOpenChange={() => setMouseOver((isMouseOver) => !isMouseOver)}
        >
          <HoverCardTrigger asChild>
            <div
              className={cn(
                'peer flex h-full w-40 flex-none cursor-pointer items-center justify-start pl-2 hover:bg-accent'
              )}
              // onMouseOver={handleMouseOver}
              // onMouseOut={handleMouseOut}
            >
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-sm"
                onClick={() => {
                  if (isPlaying) {
                    handlePlaySound();
                    stopSoundPlay();
                  } else {
                    handlePlaySound();
                  }
                }}
              >
                <PlayIcon
                  aria-hidden
                  className={cn('h-3.5 w-3.5', isPlaying && 'hidden')}
                />
                <PauseIcon
                  aria-hidden
                  className={cn('h-3.5 w-3.5', !isPlaying && 'hidden')}
                />
                <span>{sceneData.dates.join(' ')}</span>
              </Button>
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className={cn(
              'w-auto min-w-80 bg-muted p-1 text-muted-foreground',
              isFullPage && 'hidden'
            )}
          >
            <SceneDataView
              sceneData={sceneData}
              binaries={binaries}
              displayKey={displayKey}
              isPlaying={isPlaying}
              onPlayButtonClick={handlePlaySound}
            />
          </HoverCardContent>
        </HoverCard>
      )}

      <ul
        ref={sceneRef}
        className={cn(
          'relative grid h-full w-full flex-1 cursor-pointer gap-1 rounded-md bg-fixed p-1 peer-hover:ring-1',
          !isFullPage && 'data-[state=open]:ring-1'
        )}
        style={{
          gridTemplateColumns: isFullPage
            ? binaries
                ?.map((binary) => (binary === '0' ? '1fr' : '1.5fr'))
                .join(' ')
            : `repeat(${sceneLength}, 1fr)`,
          transform: isFullPage
            ? `rotateX(70deg) rotateZ(40deg) translateZ(0em) scaleX(1.15) scaleY(1.35)`
            : undefined,
          transformStyle: isFullPage ? 'preserve-3d' : undefined,
        }}
        // onClick={handlePlaySound}
        // onMouseOver={handleMouseOver}
        // onMouseOut={handleMouseOut}
      >
        {binaries?.map((binary, index) => {
          const bitId = [sceneId, index].join('-');
          return (
            <Bit
              key={`${displayKey}-${bitId}`}
              id={bitId}
              displayKey={displayKey}
              binary={binary}
              binaryIndex={index}
              isActive={isPlaying}
            />
          );
        })}
        {/* {isMouseOver ? (
              <Overlay className="z-0" onClick={handleOverlayClick} />
            ) : null} */}
      </ul>
    </SceneRoot>
  );
}

export default Scene;
