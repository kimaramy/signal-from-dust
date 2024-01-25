'use client';

import { useCallback, useState } from 'react';

import { BitContext, type SelectedBitIdx } from '../context';

interface BitProviderProps {
  children: React.ReactNode;
}

function BitProvider({ children }: BitProviderProps) {
  const [selectedBitIdx, setSelectedBitIdx] = useState<SelectedBitIdx>(null);

  const resetSelectedBitIdx = useCallback(() => setSelectedBitIdx(null), []);

  return (
    <BitContext.Provider
      value={{ selectedBitIdx, setSelectedBitIdx, resetSelectedBitIdx }}
    >
      {children}
    </BitContext.Provider>
  );
}

export default BitProvider;
