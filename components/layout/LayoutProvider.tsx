'use client';

import { LayoutContext } from './lib/context';
import { useLayoutKey, useLayoutState } from './lib/hooks';

interface LayoutProviderProps {
  children: React.ReactNode;
}

function LayoutProvider({ children }: LayoutProviderProps) {
  const initialKey = useLayoutKey('query');
  return (
    <LayoutContext.Provider value={useLayoutState(initialKey)}>
      {children}
    </LayoutContext.Provider>
  );
}

export default LayoutProvider;
