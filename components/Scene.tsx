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
  location: string;
  date: string;
  value: number | null;
  valueType: string;
  rank: number | null;
}

export interface SceneProps {
  id: string;
  data: SceneData;
  dataIndex: number;
  display: Display;
  length?: number;
  active?: boolean;
  className?: string;
  onSceneChange: (data: SceneData) => void;
}

export default function Scene({
  id,
  data,
  dataIndex,
  display,
  length = 8,
  active = false,
  onSceneChange,
}: SceneProps) {
  const sceneId = id;

  const binaries = data.value?.toString(2).split('') as Binary[] | undefined;

  const { ref } = useInView({
    threshold: 0.8,
    initialInView: dataIndex === 0,
    skip: display === '2d',
    onChange(inView) {
      if (inView) {
        onSceneChange(data);
      }
    },
  });

  const [isPlaying, setPlaying] = useState(false);

  const [isMouseOver, setMouseOver] = useState(false);

  const handleMouseOver = useCallback<React.MouseEventHandler>(() => {
    setMouseOver(true);
  }, []);

  const handleMouseOut = useCallback<React.MouseEventHandler>(() => {
    setMouseOver(false);
  }, []);

  useEffect(() => {
    if (display === '2d') {
      onSceneChange(data);
    }
  }, [data, display]);

  return (
    <li
      id={id}
      ref={ref}
      className={cn(
        'flex h-full gap-6 overflow-x-hidden',
        display === '3d' && 'justify-center pb-[var(--player-height)]'
      )}
      // style={{
      //   perspective: display === '3d' ? `1500px` : undefined,
      // }}
    >
      {display === '2d' && (
        <div className="flex w-32 flex-none items-center justify-start pl-3">
          <h4 className="w-full text-xs">{data.date}</h4>
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
              : `repeat(${length}, 1fr)`,
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
          binaries.map((binary, index, arr) => {
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
        {isMouseOver ? (
          <Overlay onClick={() => setPlaying(!isPlaying)} />
        ) : null}
      </ul>
    </li>
  );
}

export function getSceneLength(decimal: number) {
  return decimal.toString(2).length;
}
