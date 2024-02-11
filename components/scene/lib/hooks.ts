'use clinet';

import { useCallback, useContext, useMemo, useState } from 'react';

import { BitUtils, type BitData } from '@/components/bit/lib';

import { SceneContext, SceneContextError, type SceneData } from './contexts';

function useSceneContext() {
  const sceneContext = useContext(SceneContext);
  if (!sceneContext) {
    throw SceneContextError(useSceneContext.name);
  }
  return sceneContext;
}

interface UseSceneStateParams {
  sceneIdx: number;
  sceneData: SceneData;
  sceneLength: number;
}

function useSceneState({
  sceneIdx,
  sceneData,
  sceneLength,
}: UseSceneStateParams) {
  const initialBits = useMemo<BitData[]>(
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

  const [bits, _setBits] = useState(initialBits);

  const setBits = useCallback((bits: BitData[]) => _setBits(bits), []);

  const resetBits = useCallback(() => _setBits(initialBits), [initialBits]);

  const getActiveBit = useCallback(
    () => bits.find((bit) => bit.isActive) ?? initialActiveBit,
    [bits]
  );

  const setActiveBit = useCallback((targetBitIdx: number) => {
    _setBits((bits) =>
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

  return {
    sceneIdx,
    sceneData,
    bits,
    setBits,
    resetBits,
    getActiveBit,
    setActiveBit,
  };
}

export { useSceneState, useSceneContext, type UseSceneStateParams };
