'use client';

import React from 'react';

import { cn } from '@/lib/css';

import type {
  ActiveBitContextValue,
  SceneContextValue,
  ScenePlayerContextValue,
} from '../context';
import {
  useActiveBitContext,
  useSceneContext,
  useScenePlayerContext,
} from '../hooks';

type SceneBodyControl = Pick<SceneContextValue, 'bits'> &
  Pick<ScenePlayerContextValue, 'isPlaying'> &
  Pick<ActiveBitContextValue, 'resetActiveBitIdx' | 'setActiveBitIdx'>;

interface SceneBodyProps {
  columns: number;
  className?: string;
  children: (control: SceneBodyControl) => React.ReactNode;
}

const SceneBody = React.forwardRef<HTMLUListElement, SceneBodyProps>(
  function SceneBody({ columns, className, children }, ref) {
    const { bits } = useSceneContext();

    const { isPlaying } = useScenePlayerContext();

    const { setActiveBitIdx, resetActiveBitIdx } = useActiveBitContext();

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
        {children({ bits, isPlaying, setActiveBitIdx, resetActiveBitIdx })}
      </ul>
    );
  }
);

export default SceneBody;
