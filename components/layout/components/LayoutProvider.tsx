'use client';

import { LayoutContext } from '../lib/context';
import { useLayoutState } from '../lib/hooks';
import { LayoutUtils } from '../lib/schema';

interface LayoutProviderProps {
  initialLayoutKey?: LayoutUtils.Key;
  children: React.ReactNode;
}

function LayoutProvider({
  initialLayoutKey = LayoutUtils.schema.defaultKey,
  children,
}: LayoutProviderProps) {
  const layoutState = useLayoutState(initialLayoutKey);
  return (
    <LayoutContext.Provider value={layoutState}>
      {children}
    </LayoutContext.Provider>
  );
}

export default LayoutProvider;
