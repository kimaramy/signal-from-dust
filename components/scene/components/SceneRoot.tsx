'use client';

import React from 'react';

import { cn } from '@/lib/css';

import SceneProvider, { type SceneProviderProps } from './SceneProvider';

export interface SceneRootProps
  extends Omit<SceneProviderProps, 'children'>,
    React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  isDisabled?: boolean;
}

const SceneRoot = React.forwardRef<HTMLDivElement, SceneRootProps>(
  function SceneRoot(props, ref) {
    const {
      sceneIdx,
      sceneData,
      sceneLength,
      isActive = false,
      isDisabled = false,
      className,
      children,
      ...rest
    } = props;

    return (
      <SceneProvider
        sceneIdx={sceneIdx}
        sceneData={sceneData}
        sceneLength={sceneLength}
      >
        <section
          ref={ref}
          className={cn(
            'relative flex h-full items-center gap-6 rounded-md',
            isActive && 'z-20',
            isDisabled && 'pointer-events-none opacity-50',
            className
          )}
          {...rest}
        >
          {children}
        </section>
      </SceneProvider>
    );
  }
);

export default SceneRoot;
