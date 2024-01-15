'use client';

import React from 'react';

import { cn } from '@/lib/css';

import type { ScenePlayerContextValue } from '../context';
import { useScenePlayerContext } from '../hooks';

interface SceneHeaderProps {
  className?: string;
  children: (control: ScenePlayerContextValue) => React.ReactNode;
}

const SceneHeader = React.forwardRef<HTMLDivElement, SceneHeaderProps>(
  function SceneHeader({ className, children }, ref) {
    const { isPlaying, setPlaying } = useScenePlayerContext();

    return (
      <div
        ref={ref}
        style={{ width: `min(8rem, 12vw)` }}
        className={cn('h-full flex-none', className)}
      >
        {children({ isPlaying, setPlaying })}
      </div>
    );
  }
);

export default SceneHeader;
