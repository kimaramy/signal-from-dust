'use client';

import React, { useCallback, useMemo, useState } from 'react';

import { cn } from '@/lib/css';
import { BitUtils } from '@/components/bit';

import { SceneContext, type SceneData } from '../context';

export interface SceneRootProps extends React.HTMLAttributes<HTMLDivElement> {
  sceneIdx: number;
  sceneData: SceneData;
  sceneLength: number;
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

    const initialBits = useMemo(
      () =>
        BitUtils.toBitValuesWithVacancies(sceneData.value, sceneLength).map(
          (value, idx) => ({
            id: idx,
            value,
            isVacant: value === '-1',
            isActive: false,
          })
        ),
      [sceneData.value, sceneLength]
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
            if (bit.id === targetBitIdx) {
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
      </SceneContext.Provider>
    );
  }
);

export default SceneRoot;
