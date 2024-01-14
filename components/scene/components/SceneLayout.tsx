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

interface SceneLayoutProps {
  columns: number;
  className?: string;
  renderHead: (control: ScenePlayerContextValue) => React.ReactNode;
  renderData: (
    control: Pick<SceneContextValue, 'bits'> &
      Pick<ScenePlayerContextValue, 'isPlaying'> &
      Pick<ActiveBitContextValue, 'resetActiveBitIdx' | 'setActiveBitIdx'>
  ) => React.ReactNode;
}

const SceneLayout = React.forwardRef<HTMLUListElement, SceneLayoutProps>(
  function SceneLayout({ columns, className, renderHead, renderData }, ref) {
    const { bits } = useSceneContext();

    const { isPlaying, setPlaying } = useScenePlayerContext();

    const { setActiveBitIdx, resetActiveBitIdx } = useActiveBitContext();

    return (
      <>
        <div
          style={{ width: `min(8rem, 12vw)` }}
          className="peer h-full flex-none cursor-pointer"
        >
          {renderHead({ isPlaying, setPlaying })}
        </div>
        <ul
          ref={ref}
          className={cn(
            'relative grid h-full w-full flex-1 cursor-pointer gap-1 rounded-md bg-fixed p-1 peer-hover:ring-1',
            className
          )}
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {renderData({ bits, isPlaying, setActiveBitIdx, resetActiveBitIdx })}
        </ul>
      </>
    );
  }
);

export default SceneLayout;
