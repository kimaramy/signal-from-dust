'use client';

import React from 'react';

import { cn } from '@/lib/css';

import type { SceneContextValue } from '../context';
import { useSceneContext } from '../hooks';

export type SceneHeaderContext = Pick<SceneContextValue, 'bits'>;

interface SceneHeaderProps {
  className?: string;
  children: (context: SceneHeaderContext) => React.ReactNode;
}

const SceneHeader = React.forwardRef<HTMLDivElement, SceneHeaderProps>(
  function SceneHeader({ className, children }, ref) {
    const { bits } = useSceneContext();

    return (
      <header
        ref={ref}
        style={{ width: `min(7.5rem, 12vw)` }}
        className={cn('h-full flex-none', className)}
      >
        {children({ bits })}
      </header>
    );
  }
);

export default SceneHeader;
