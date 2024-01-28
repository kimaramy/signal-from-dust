import { useCallback, useState } from 'react';

export function useActiveScene() {
  const initialActiveSceneIdx = null;

  const [activeSceneIdx, setActiveSceneIdx] = useState<number | null>(
    initialActiveSceneIdx
  );

  const resetActiveSceneIdx = useCallback(
    () => setActiveSceneIdx(initialActiveSceneIdx),
    [initialActiveSceneIdx]
  );

  const validateOtherSceneActive = useCallback(
    (targetSceneIdx: number) => {
      const isAnySceneActive = activeSceneIdx !== null;
      const isTargetSceneActive = targetSceneIdx !== activeSceneIdx;
      return isAnySceneActive && isTargetSceneActive;
    },
    [activeSceneIdx]
  );

  return {
    activeSceneIdx,
    setActiveSceneIdx,
    resetActiveSceneIdx,
    validateOtherSceneActive,
  };
}
