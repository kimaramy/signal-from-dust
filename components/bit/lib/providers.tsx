'use client';

import type { BaseProviderProps } from '@/lib/react-types';

import { BitContext } from './contexts';
import { useBitState } from './hooks';

function BitProvider({ children }: BaseProviderProps) {
  return (
    <BitContext.Provider value={useBitState()}>{children}</BitContext.Provider>
  );
}

export { BitProvider };
