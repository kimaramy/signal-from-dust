'use client';

import { useCallback, useContext, useState } from 'react';

import {
  BitContext,
  BitContextError,
  type BitContextValue,
  type SelectedBitIdx,
} from './context';

function useBitState() {
  const [selectedBitIdx, _setSelectedBitIdx] = useState<SelectedBitIdx>(null);
  const setSelectedBitIdx = useCallback(
    (bitIdx: number) => _setSelectedBitIdx(bitIdx),
    []
  );
  const resetSelectedBitIdx = useCallback(() => _setSelectedBitIdx(null), []);
  return {
    selectedBitIdx,
    setSelectedBitIdx,
    resetSelectedBitIdx,
  };
}

function useBitContext<T extends boolean>(
  options = { strict: true as T }
): T extends true ? BitContextValue : BitContextValue | null {
  const bitContext = useContext(BitContext);
  if (options?.strict && !bitContext) {
    throw BitContextError(useBitContext.name);
  }
  return bitContext as any;
}

export { useBitState, useBitContext };
