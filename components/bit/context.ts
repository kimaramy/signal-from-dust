'use client';

import React, { createContext } from 'react';

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
  setSelectedBitIdx: React.Dispatch<React.SetStateAction<SelectedBitIdx>>;
  resetSelectedBitIdx: () => void;
}

const BitContext = createContext<BitContextValue | null>(null);

export {
  BitContext,
  type BitContextValue,
  type BitValue,
  type VacantBitValue,
  type BitData,
  type SelectedBitIdx,
};
