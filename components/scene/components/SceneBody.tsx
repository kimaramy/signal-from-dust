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
  function SceneBody(props, ref) {
    const {
      columns,
      intervalSecond,
      isPlaying = false,
      className,
      children,
    } = props;

    const { bits, getActiveBit, setBits, setActiveBit, resetBits } =
      useSceneContext();

    const { activeBitIdx, setActiveBitIdx, resetActiveBitIdx } =
      useBitContext();

    // Do not add bits to deps cause it'll not trigger single interval context
    useEffect(() => {
      let interval: NodeJS.Timer;

      let _activeBitIdx = 0;

      if (isPlaying) {
        // console.log(`ready: ${_activeBitIdx}`);
        if (_activeBitIdx === 0) {
          // console.log(`init_start: ${_activeBitIdx}`);
          const initialBits = [
            { ...bits[0], isActive: true },
            ...bits.slice(1),
          ] as typeof bits;
          setBits(initialBits);
          _activeBitIdx++;
          // console.log(`init_end: ${_activeBitIdx}`);
        }
        interval = setInterval(() => {
          // console.log(`interval_start: ${_activeBitIdx}`);
          const newBits = bits.reduce(
            (accum, bit) => {
              if (bit.idx === _activeBitIdx % bits.length) {
                accum.push({ ...bit, isActive: true });
              } else {
                accum.push({ ...bit, isActive: false });
              }
              return accum;
            },
            [] as typeof bits
          );
          setBits(newBits);
          _activeBitIdx++;
          // console.log(`interval_end: ${_activeBitIdx}`);
        }, intervalSecond * 1000);
        // console.log(`finished: ${_activeBitIdx}`);
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
