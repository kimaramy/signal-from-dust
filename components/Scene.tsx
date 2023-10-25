'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/lib/utils';
import type { Display } from '@/components/display';

import Bit, { Binary } from './Bit';
import Overlay from './Overlay';
import { Skeleton } from './ui/skeleton';

export interface SceneData {
  id: number;
  name: string;
  collection: string;
  dates: string[];
  value: number | null;
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

export default function Scene({
  sceneId,
  sceneData,
  sceneIndex,
  sceneLength = 8,
  display,
  active = false,
  onSceneChange,
}: SceneProps) {
  const binaries = sceneData.value?.toString(2).split('') as
    | Binary[]
    | undefined;

  const { ref } = useInView({
    threshold: 0.8,
    initialInView: sceneIndex === 0,
    skip: display === '2d',
    onChange(inView) {
      if (inView) {
        onSceneChange(sceneData, sceneIndex);
      }
    },
  });

  const [isPlaying, setPlaying] = useState(false);

  const [isMouseOver, setMouseOver] = useState(false);

  const handleMouseOver = useCallback<React.MouseEventHandler>(() => {
    if (display === '2d') {
      onSceneChange(sceneData, sceneIndex);
    }
    setMouseOver(true);
  }, [display, sceneData]);

  const handleMouseOut = useCallback<React.MouseEventHandler>(() => {
    setMouseOver(false);
  }, []);

  const handleOverlayClick = useCallback<React.MouseEventHandler>(() => {
    setPlaying((isPlaying) => !isPlaying);
  }, []);

  return (
    <li
      id={sceneId}
      ref={ref}
      className={cn(
        'flex h-full gap-4 overflow-x-hidden',
        display === '3d' && 'justify-center pb-[var(--player-height)]'
      )}
      // style={{
      //   perspective: display === '3d' ? `1500px` : undefined,
      // }}
    >
      {display === '2d' && (
        <div className="flex w-24 flex-none items-center justify-start pl-4">
          <h4 className="w-full text-xs">
            {sceneData.dates[sceneData.dates.length - 1]}
          </h4>
        </div>
      )}
      <ul
        className={cn(
          'relative grid h-full w-full flex-1 cursor-pointer p-1',
          display === '3d' ? 'gap-0' : 'gap-1 lg:gap-2'
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
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {binaries ? (
          binaries.map((binary, index) => {
            const bitId = [sceneId, index].join('-');
            return (
              <Bit
                key={bitId}
                id={bitId}
                binary={binary}
                binaryIndex={index}
                display={display}
                isActive={isPlaying}
              />
            );
          })
        ) : (
          <Skeleton className="h-full" />
        )}
        {isMouseOver ? <Overlay onClick={handleOverlayClick} /> : null}
      </ul>
    </li>
  );
}

export function getSceneLength(decimal: number) {
  return decimal.toString(2).length;
}
