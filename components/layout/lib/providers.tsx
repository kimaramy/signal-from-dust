'use client';

import type { BaseProviderProps } from '@/lib/react-types';

import { LayoutContext } from './contexts';
import { useLayoutState } from './hooks';
import { LayoutUtils } from './schemes';

interface LayoutProviderProps extends BaseProviderProps {
  initialLayoutKey?: LayoutUtils.Key;
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

export { LayoutProvider };
