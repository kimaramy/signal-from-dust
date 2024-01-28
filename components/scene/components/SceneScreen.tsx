'use client';

import React, { useEffect } from 'react';

import { cn } from '@/lib/css';

import type { SceneContextValue } from '../context';
import { useSceneContext } from '../hooks';

interface SceneScreenProps
  extends Omit<React.HTMLAttributes<HTMLOListElement>, 'children'> {
  isPlaying: boolean;
  intervalSecond: number;
  children: (context: SceneContextValue) => React.ReactNode;
}

const SceneScreen = React.forwardRef<HTMLOListElement, SceneScreenProps>(
  function SceneScreen(
    { isPlaying, intervalSecond, children, className, style, ...rest },
    ref
  ) {
    const sceneContext = useSceneContext();

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
            (accum, bit, bitIdx) => {
              if (bitIdx === _activeBitIdx % loopLength) {
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
          gridTemplateColumns: sceneContext.bits
            ?.map((bit) => (bit.value === '0' ? '1fr' : '1.5fr'))
            .join(' '),
          transform: `translateY(-3em) rotateX(70deg) rotateZ(40deg) translateZ(0em) scaleX(1.15) scaleY(0.9)`, // scaleX(1.15) scaleY(1.35)
          transformStyle: 'preserve-3d',
          ...style,
        }}
        className={cn(
          'relative grid h-full w-full cursor-pointer list-none gap-0.5 rounded-md bg-fixed p-1',
          className
        )}
        {...rest}
      >
        {children(sceneContext)}
      </ol>
    );
  }
);

export default SceneScreen;
