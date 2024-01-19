'use client';

import React, { useEffect } from 'react';

import { cn } from '@/lib/css';

import type { BitContextValue, SceneContextValue } from '../context';
import { useBitContext, useSceneContext } from '../hooks';

export type SceneBodyContext = Omit<
  SceneContextValue,
  'sceneIdx' | 'sceneData'
> &
  BitContextValue;

interface SceneBodyProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  columns: number;
  isPlaying: boolean;
  intervalSecond: number;
  children: (context: SceneBodyContext) => React.ReactNode;
}

const SceneBody = React.forwardRef<HTMLUListElement, SceneBodyProps>(
  function SceneBody(
    { columns, intervalSecond, isPlaying = false, className, children },
    ref
  ) {
    const { bits, getActiveBit, setBits, setActiveBit, resetBits } =
      useSceneContext();

    const { activeBitIdx, setActiveBitIdx, resetActiveBitIdx } =
      useBitContext();

    useEffect(() => {
      let interval: NodeJS.Timer;

      let _activeBitIdx = 0;

      if (isPlaying) {
        interval = setInterval(() => {
          // console.log(_activeBitIdx);
          setBits((bits) =>
            bits.reduce(
              (accum, bit) => {
                if (bit.idx === _activeBitIdx % bits.length) {
                  accum.push({ ...bit, isActive: true });
                } else {
                  accum.push({ ...bit, isActive: false });
                }
                return accum;
              },
              [] as typeof bits
            )
          );
          _activeBitIdx++;
        }, intervalSecond * 1000);
      } else {
        resetBits();
      }
      return () => {
        clearInterval(interval);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, intervalSecond]);

    return (
      <ul
        ref={ref}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
        className={cn(
          'relative grid h-full w-full flex-1 gap-1 rounded-md bg-fixed p-1',
          className
        )}
      >
        {children({
          bits,
          setBits,
          resetBits,
          getActiveBit,
          setActiveBit,
          activeBitIdx,
          setActiveBitIdx,
          resetActiveBitIdx,
        })}
      </ul>
    );
  }
);

export default SceneBody;
