'use client';

import React, { useCallback, useMemo, useState } from 'react';

import { cn } from '@/lib/css';
import { BitUtils } from '@/components/bit';

import {
  BitContext,
  SceneContext,
  type ActiveBitIdx,
  type SceneData,
} from '../context';

export interface SceneRootProps extends React.HTMLAttributes<HTMLDivElement> {
  sceneIdx: number;
  sceneData: SceneData;
  isActive?: boolean;
  isDisabled?: boolean;
}

const SceneRoot = React.forwardRef<HTMLDivElement, SceneRootProps>(
  function SceneRoot(props, ref) {
    const {
      sceneIdx,
      sceneData,
      isActive = false,
      isDisabled = false,
      className,
      children,
      ...rest
    } = props;

    const initialBits = useMemo(
      () =>
        BitUtils.toBits(sceneData.value).map((value, idx) => ({
          idx,
          value,
          isActive: false,
        })),
      [sceneData.value]
    );

    const initialActiveBit = null;

    const [bits, setBits] = useState(initialBits);

    const resetBits = useCallback(() => setBits(initialBits), [initialBits]);

    const getActiveBit = useCallback(
      () => bits.find((bit) => bit.isActive) ?? initialActiveBit,
      [bits]
    );

    const setActiveBit = useCallback((targetBitIdx: number) => {
      setBits((bits) =>
        bits.reduce(
          (accum, bit) => {
            if (bit.idx === targetBitIdx) {
              accum.push({ ...bit, isActive: true });
            } else {
              accum.push({ ...bit, isActive: false });
            }
            return accum;
          },
          [] as typeof bits
        )
      );
    }, []);

    const [activeBitIdx, setActiveBitIdx] = useState<ActiveBitIdx>(null);

    const resetActiveBitIdx = useCallback(() => setActiveBitIdx(null), []);

    return (
      <SceneContext.Provider
        value={{
          sceneIdx,
          sceneData,
          bits,
          setBits,
          resetBits,
          getActiveBit,
          setActiveBit,
        }}
      >
        <BitContext.Provider
          value={{ activeBitIdx, setActiveBitIdx, resetActiveBitIdx }}
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
        </BitContext.Provider>
      </SceneContext.Provider>
    );
  }
);

export default SceneRoot;
