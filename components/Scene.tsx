'use client';

import React, { useCallback, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import { cn } from '@/lib/css';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Icon } from '@/components/ui/icon';
import { type DisplayKey } from '@/components/display';
import { stopSoundPlay, toggleSoundPlay } from '@/components/sound';

import type { Binary } from './Bit';
import Bit from './Bit';
import SceneRoot from './SceneRoot';
import { Skeleton } from './ui/skeleton';

const SceneDataView = dynamic(() => import('./SceneDataView'), {
  ssr: false,
  loading: () => <Skeleton className="h-20 w-full" />,
});

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

type SceneHandler = (data: SceneData, index: number) => void;

export interface SceneProps {
  id: string;
  className?: string;
  data: SceneData;
  index: number;
  length?: number;
  displayKey: DisplayKey;
  onClick?: SceneHandler;
  onInView?: SceneHandler;
  onOutOfView?: SceneHandler;
}

function Scene({
  id,
  data,
  index,
  length = 8,
  className,
  displayKey,
  onClick,
  onInView,
  onOutOfView,
}: SceneProps) {
  const isFullPage = displayKey === 'FULL';

  const binaries = data.value?.toString(2).split('') as Binary[] | undefined;

  const sceneRef = useRef<HTMLUListElement>(null);

  const [isPlaying, setPlaying] = useState(false);

  // const [isMouseOver, setMouseOver] = useState(false);

  const handlePlaySound = useCallback(() => {
    if (binaries) {
      toggleSoundPlay(binaries, {
        onStart() {
          setPlaying(true);
          // setMouseOver(true);
        },
        onStop() {
          setPlaying(false);
          // setMouseOver(false);
        },
      });
    }
  }, [binaries]);

  const handleStopSound = useCallback(() => {
    stopSoundPlay(() => setPlaying(false));
  }, []);

  // const handleMouseOver = useCallback<React.MouseEventHandler>(() => {
  //   setMouseOver(true);
  // }, [data]);

  // const handleMouseOut = useCallback<React.MouseEventHandler>(() => {
  //   setMouseOver(false);
  // }, []);

  const handleOverlayClick = useCallback<React.MouseEventHandler>(() => {
    setPlaying((isPlaying) => !isPlaying);
  }, []);

  return (
    <SceneRoot
      id={id}
      className={className}
      justify={'start'}
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
            sceneData={data}
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
              style={{ width: `min(8rem, 12vw)` }}
              className={cn(
                'peer flex h-full flex-none cursor-pointer flex-nowrap items-center justify-start hover:bg-accent'
              )}
              // onMouseOver={handleMouseOver}
              // onMouseOut={handleMouseOut}
            >
              <Button
                variant="ghost"
                size="icon"
                className="flex-none"
                onClick={() => {
                  if (isPlaying) {
                    handlePlaySound();
                    stopSoundPlay();
                  } else {
                    handlePlaySound();
                  }
                }}
              >
                {isPlaying ? (
                  <Icon.Pause aria-label="Pause" className="h-3.5 w-3.5" />
                ) : (
                  <Icon.Play aria-label="Play" className="h-3.5 w-3.5" />
                )}
              </Button>
              <p className="flex-1 truncate font-mono text-xs">
                {data.dates[0]}
              </p>
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
              sceneData={data}
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
            : `repeat(${length}, 1fr)`,
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
          const bitId = [id, index].join('-');
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
