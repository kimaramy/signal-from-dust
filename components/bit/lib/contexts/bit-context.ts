'use client';

import { createContext } from 'react';

type BitValue = '1' | '0';

type VacantBitValue = '-1';

type BitData = {
  id: number;
  value: BitValue | VacantBitValue;
  isActive: boolean;
  isVacant: boolean;
};

type SelectedBitIdx = number | null;

interface BitContextValue {
  selectedBitIdx: SelectedBitIdx;
  setSelectedBitIdx: (bitIdx: number) => void;
  resetSelectedBitIdx: () => void;
}

const BitContext = createContext<BitContextValue | null>(null);

const BitContextError = (caller: string) =>
  new Error(`${caller} must be called within a BitContext.Provider`);

export {
  BitContext,
  BitContextError,
  type BitContextValue,
  type BitValue,
  type VacantBitValue,
  type BitData,
  type SelectedBitIdx,
};
