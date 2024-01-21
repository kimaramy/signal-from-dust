'use client';

import React, { useEffect } from 'react';

import { cn } from '@/lib/css';

import type { BitContextValue, SceneContextValue } from '../context';
import { useBitContext, useSceneContext } from '../hooks';

export type SceneBodyContexts = [
  sceneContext: SceneContextValue,
  bitContext: BitContextValue,
];

interface SceneBodyProps {
  columns: number;
  isPlaying: boolean;
  intervalSecond: number;
  className?: string;
  children: (...contexts: SceneBodyContexts) => React.ReactNode;
}

const SceneBody = React.forwardRef<HTMLOListElement, SceneBodyProps>(
  function SceneBody(props, ref) {
    const {
      columns,
      intervalSecond,
      isPlaying = false,
      className,
      children,
    } = props;

    const sceneContext = useSceneContext();

    const bitContext = useBitContext();

    // Do not add bits to deps cause it'll not trigger single interval context
    useEffect(() => {
      let interval: NodeJS.Timer;

      let _activeBitIdx = 0;

      if (isPlaying) {
        // console.log(`ready: ${_activeBitIdx}`);
        if (_activeBitIdx === 0) {
          // console.log(`init_start: ${_activeBitIdx}`);
          const initialBits = [
            { ...sceneContext.bits[0], isActive: true },
            ...sceneContext.bits.slice(1),
          ] as typeof sceneContext.bits;
          sceneContext.setBits(initialBits);
          _activeBitIdx++;
          // console.log(`init_end: ${_activeBitIdx}`);
        }
        interval = setInterval(() => {
          // console.log(`interval_start: ${_activeBitIdx}`);
          const loopLength = sceneContext.bits.length;
          const newBits = sceneContext.bits.reduce(
            (accum, bit) => {
              if (bit.idx === _activeBitIdx % loopLength) {
                accum.push({ ...bit, isActive: true });
              } else {
                accum.push({ ...bit, isActive: false });
              }
              return accum;
            },
            [] as typeof sceneContext.bits
          );
          sceneContext.setBits(newBits);
          _activeBitIdx++;
          // console.log(`interval_end: ${_activeBitIdx}`);
        }, intervalSecond * 1000);
        // console.log(`finished: ${_activeBitIdx}`);
      } else {
        sceneContext.resetBits();
      }
      return () => {
        clearInterval(interval);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, intervalSecond]);

    return (
      <ol
        ref={ref}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
        className={cn(
          'relative grid h-full w-full flex-1 list-none gap-1 rounded-md bg-fixed  p-1',
          className
        )}
      >
        {children(sceneContext, bitContext)}
      </ol>
    );
  }
);

export default SceneBody;
