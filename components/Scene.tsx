'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/lib/utils';
// import Overlay from './Overlay';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Display } from '@/components/display';
import { stopSoundPlay, toggleSoundPlay } from '@/components/sound';

import Bit, { Binary } from './Bit';
import SceneData3DView from './SceneData3DView';

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
  sceneId: string;
  sceneData: SceneData;
  sceneIndex: number;
  sceneLength?: number;
  display: Display;
  active?: boolean;
  className?: string;
  onSceneChange: (sceneData: SceneData, sceneIndex: number) => void;
}

function Scene({
  sceneId,
  sceneData,
  sceneIndex,
  sceneLength = 8,
  display,
  active = false,
  className,
  onSceneChange,
}: SceneProps) {
  const binaries = sceneData.value?.toString(2).split('') as
    | Binary[]
    | undefined;

  const sceneRef = useRef<HTMLUListElement>(null);

  const { ref, inView } = useInView({
    threshold: 0.8,
    initialInView: sceneIndex === 0,
    skip: display === '2d',
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
    if (display === '2d') {
      onSceneChange(sceneData, sceneIndex);
      // handleStopSound();
    }
    setMouseOver(true);
  }, [display, sceneData]);

  const handleMouseOut = useCallback<React.MouseEventHandler>(() => {
    setMouseOver(false);
  }, []);

  const handleOverlayClick = useCallback<React.MouseEventHandler>(() => {
    setPlaying((isPlaying) => !isPlaying);
  }, []);

  // useEffect(() => {
  //   let timeout: NodeJS.Timeout;

  //   if (inView) {
  //     console.log('inView', sceneId);
  //     timeout = setTimeout(() => {
  //       handlePlaySound();
  //     }, 300);
  //   } else {
  //     console.log('outView', sceneId);
  //     handleStopSound();
  //   }

  //   () => {
  //     timeout && clearTimeout(timeout);
  //   };
  // }, [inView]);

  return (
    <li
      id={sceneId}
      ref={ref}
      className={cn(
        'relative flex h-full items-center gap-6',
        display === '3d' && 'justify-center overflow-x-hidden',
        className
      )}
      // style={{
      //   perspective: display === '3d' ? `1500px` : undefined,
      // }}
    >
      {display === '3d' && (
        <div
          className={cn(
            'min-w-80 absolute bottom-[8%] left-[4%] z-20 w-auto bg-muted text-muted-foreground'
          )}
        >
          <SceneData3DView
            sceneData={sceneData}
            binaries={binaries}
            display={display}
            isPlaying={isPlaying}
            onPlayButtonClick={handlePlaySound}
          />
        </div>
      )}
      {display === '2d' && (
        <HoverCard
          open={isMouseOver}
          openDelay={0}
          closeDelay={0}
          onOpenChange={() => setMouseOver((isMouseOver) => !isMouseOver)}
        >
          <HoverCardTrigger asChild>
            <div
              className={cn(
                'flex h-full w-40 flex-none cursor-pointer items-center justify-start pl-4 hover:bg-accent'
              )}
              // onMouseOver={handleMouseOver}
              // onMouseOut={handleMouseOut}
            >
              <h4 className="flex items-center text-sm">
                <span>{sceneData.dates.join(' ')}</span>
                <ChevronRightIcon aria-hidden className="h-5 w-5 pl-1" />
              </h4>
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className={cn(
              'min-w-80 w-auto bg-muted p-1 text-muted-foreground',
              display !== '2d' && 'hidden'
            )}
          >
            {/* <SceneDataView
              sceneData={sceneData}
              binaries={binaries}
              isPlaying={isPlaying}
              onPlayButtonClick={handlePlaySound}
            /> */}
            <SceneData3DView
              sceneData={sceneData}
              binaries={binaries}
              display={display}
              isPlaying={isPlaying}
              onPlayButtonClick={handlePlaySound}
            />
          </HoverCardContent>
        </HoverCard>
      )}

      <ul
        ref={sceneRef}
        className={cn(
          'relative grid h-full w-full flex-1 cursor-pointer gap-1 rounded-md bg-fixed p-1',
          display === '2d' && 'hover:ring-1 data-[state=open]:ring-1'
        )}
        style={{
          gridTemplateColumns:
            display === '3d'
              ? binaries
                  ?.map((binary) => (binary === '0' ? '1fr' : '1.5fr'))
                  .join(' ')
              : `repeat(${sceneLength}, 1fr)`,
          transform:
            display === '3d'
              ? `rotateX(70deg) rotateZ(40deg) translateZ(0em) scaleX(1.15) scaleY(1.35)`
              : undefined,
          transformStyle: display === '3d' ? 'preserve-3d' : undefined,
        }}
        onClick={handlePlaySound}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {binaries?.map((binary, index) => {
          const bitId = [sceneId, index].join('-');
          return (
            <Bit
              key={`${display}-${bitId}`}
              id={bitId}
              binary={binary}
              binaryIndex={index}
              display={display}
              isActive={isPlaying}
            />
          );
        })}
        {/* {isMouseOver ? (
              <Overlay className="z-0" onClick={handleOverlayClick} />
            ) : null} */}
      </ul>
    </li>
  );
}

export default Scene;
