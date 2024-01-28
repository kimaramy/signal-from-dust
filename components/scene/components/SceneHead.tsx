'use client';

import React from 'react';

import { cn } from '@/lib/css';

import type { SceneContextValue } from '../context';
import { useSceneContext } from '../hooks';

export type SceneHeadContext = Pick<SceneContextValue, 'bits'>;

interface SceneHeadProps {
  className?: string;
  children: (context: SceneHeadContext) => React.ReactNode;
}

const SceneHead = React.forwardRef<HTMLDivElement, SceneHeadProps>(
  function SceneHead({ className, children }, ref) {
    const { bits } = useSceneContext();

    return (
      <header
        ref={ref}
        style={{ width: `min(8rem, 12vw)` }}
        className={cn('h-full flex-none', className)}
      >
        {children({ bits })}
      </header>
    );
  }
);

export default SceneHead;
