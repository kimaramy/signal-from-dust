'use client';

import React from 'react';

import { cn } from '@/lib/css';

import { useSceneContext, type SceneContextValue } from '../lib';

interface SceneHeadProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  children: (
    context: Pick<SceneContextValue, 'sceneData' | 'bits'>
  ) => React.ReactNode;
}

const SceneHead = React.forwardRef<HTMLDivElement, SceneHeadProps>(
  function SceneHead({ children, className, ...rest }, ref) {
    const { sceneData, bits } = useSceneContext();

    return (
      <header
        ref={ref}
        style={{ width: `min(9rem, 15vw)` }}
        className={cn('h-full flex-none', className)}
        {...rest}
      >
        {children({ sceneData, bits })}
      </header>
    );
  }
);

export default SceneHead;
