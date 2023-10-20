'use client';

import React, { useCallback, useState } from 'react';
import { PauseCircle, PlayCircle } from 'lucide-react';

// import { PauseCircle, PlayCircle } from "lucide-react"

import Bit from './Bit';
import Overlay from './Overlay';
import { Button } from './ui/button';
// import { Overlay } from "./overlay"
// import { Button } from "./ui/button"
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
  length?: number;
  active?: boolean;
  className?: string;
}

export default function Scene({
  id,
  context,
  data,
  length = 8,
  active = false,
}: SceneProps) {
  const binaries = data.value?.toString(2).split('');

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
      className="relative flex h-full cursor-pointer items-center gap-6 hover:ring-1 p-2"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {/* <Button variant="ghost" size="lg" onClick={() => setPlaying(!isPlaying)}>
        {isPlaying ? (
          <PauseCircle className="h-5 w-5" />
        ) : (
          <PlayCircle className="h-5 w-5" />
        )}
      </Button> */}
      <ul
        className="grid h-full w-full gap-1 lg:gap-2"
        style={{
          gridTemplateColumns: `repeat(${length}, 1fr)`,
        }}
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
                isActive={isPlaying}
              />
            );
          })
        ) : (
          <Skeleton className="h-full" />
        )}
      </ul>
      {isMouseOver ? <Overlay onClick={() => setPlaying(!isPlaying)} /> : null}
    </li>
  );
}
