'use client';

import React from 'react';

import { cn } from '@/lib/css';

import type { SceneContextValue } from '../context';
import { useSceneContext } from '../hooks';

type SceneHeadContext = Pick<SceneContextValue, 'sceneData' | 'bits'>;

interface SceneHeadProps {
  className?: string;
  children: (context: SceneHeadContext) => React.ReactNode;
}

const SceneHead = React.forwardRef<HTMLDivElement, SceneHeadProps>(
  function SceneHead({ className, children }, ref) {
    const { sceneData, bits } = useSceneContext();

    return (
      <header
        ref={ref}
        style={{ width: `min(9rem, 15vw)` }}
        className={cn('h-full flex-none', className)}
      >
        {children({ sceneData, bits })}
      </header>
    );
  }
);

export default SceneHead;
