'use client';

import React, { useCallback, useState } from 'react';

import { cn } from '@/lib/utils';
import type { Display } from '@/components/display';

import Bit, { Binary } from './Bit';
import Overlay from './Overlay';
import { Skeleton } from './ui/skeleton';

export interface SceneData {
  id: number;
  label: string;
  value: number | null;
}

export interface SceneProps {
  id: string;
  context: (string | number)[];
  data: SceneData;
  display: Display;
  length?: number;
  active?: boolean;
  className?: string;
}

export default function Scene({
  id,
  context,
  data,
  display,
  length = 8,
  active = false,
}: SceneProps) {
  const binaries = data.value?.toString(2).split('') as Binary[] | undefined;

  const [isPlaying, setPlaying] = useState(false);

  const [isMouseOver, setMouseOver] = useState(false);

  const handleMouseOver = useCallback<React.MouseEventHandler>(() => {
    setMouseOver(true);
  }, []);

  const handleMouseOut = useCallback<React.MouseEventHandler>(() => {
    setMouseOver(false);
  }, []);

  // const [sequenceHeight, setSequenceHeight] = useState(0)

  // useEffect(() => {
  //   const sequenceElement = document.getElementById(context[0]) as HTMLElement
  //   const resizeObserver = new ResizeObserver((event) => {
  //     // Depending on the layout, you may need to swap inlineSize with blockSize
  //     // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
  //     setSequenceHeight(event[0].contentBoxSize[0].blockSize)
  //   })
  //   resizeObserver.observe(sequenceElement)
  //   return () => {
  //     resizeObserver.unobserve(sequenceElement)
  //   }
  // }, [context])

  // useEffect(() => {
  //   console.log(sequenceHeight)
  // }, [sequenceHeight])

  return (
    <li
      id={id}
      className="relative flex h-full cursor-pointer justify-between gap-6"
      // style={{
      //   perspective: display === '3d' ? `2000px` : undefined,
      // }}
      // onMouseOver={handleMouseOver}
      // onMouseOut={handleMouseOut}
    >
      <div
        className="absolute left-[1%] top-[40%] z-20 w-auto translate-x-[-1%] translate-y-[-40%] p-4"
        style={{
          transform: `rotateX(45deg) rotateZ(-45deg) translateZ(-1em)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <h3 className="font-mono text-2xl font-bold">{data.value}(㎍/㎥)</h3>
        <h4 className="text-2xl">{data.label}</h4>
      </div>
      <ul
        className={cn(
          'relative grid h-full w-full flex-none p-1 hover:ring-1',
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
              ? `rotateX(45deg) rotateZ(45deg) translateZ(-1em)`
              : undefined,
          transformStyle: display === '3d' ? 'preserve-3d' : undefined,
          // transform: `rotateX(45deg) rotateZ(45deg) translateZ(-1em)`,
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {binaries ? (
          binaries.map((binary, i) => {
            const bitContext = context.concat(i);
            const bitId = bitContext.join('-');
            return (
              <Bit
                key={bitId}
                id={bitId}
                context={bitContext}
                binary={binary}
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
