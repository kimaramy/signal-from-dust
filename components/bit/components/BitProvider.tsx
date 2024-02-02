'use client';

import { BitContext } from '../context';
import { useBitState } from '../hooks';

interface BitProviderProps {
  children: React.ReactNode;
}

function BitProvider({ children }: BitProviderProps) {
  const bitState = useBitState();
  return <BitContext.Provider value={bitState}>{children}</BitContext.Provider>;
}

export default BitProvider;
