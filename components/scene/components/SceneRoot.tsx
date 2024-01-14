'use client';

import React, { useCallback, useState } from 'react';

import { cn } from '@/lib/css';
import { BitUtils } from '@/components/bit';

import {
  ActiveBitContext,
  SceneContext,
  ScenePlayerContext,
  type ActiveBitIdx,
  type SceneData,
} from '../context';

export interface SceneRootProps extends React.HTMLAttributes<HTMLDivElement> {
  sceneIdx: number;
  sceneData: SceneData;
}

const SceneRoot = React.forwardRef<HTMLDivElement, SceneRootProps>(
  function SceneRoot(props, ref) {
    const { sceneIdx, sceneData, className, children, ...rest } = props;

    const bits = BitUtils.toBits(sceneData.value);

    const [isPlaying, setPlaying] = useState(false);

    const [activeBitIdx, setActiveBitIdx] = useState<ActiveBitIdx>(null);

    const resetActiveBitIdx = useCallback(() => setActiveBitIdx(null), []);

    return (
      <SceneContext.Provider value={{ sceneIdx, sceneData, bits }}>
        <ScenePlayerContext.Provider value={{ isPlaying, setPlaying }}>
          <ActiveBitContext.Provider
            value={{ activeBitIdx, setActiveBitIdx, resetActiveBitIdx }}
          >
            <div
              ref={ref}
              className={cn(
                'relative flex h-full items-center gap-6',
                className
              )}
              {...rest}
            >
              {children}
            </div>
          </ActiveBitContext.Provider>
        </ScenePlayerContext.Provider>
      </SceneContext.Provider>
    );
  }
);

export default SceneRoot;
