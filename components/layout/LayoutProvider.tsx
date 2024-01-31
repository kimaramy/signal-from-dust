'use client';

import React, { useCallback, useState } from 'react';

import { LayoutContext } from './lib/context';
import { useLayoutKey } from './lib/hooks';
import { LayoutUtils } from './lib/schema';

interface LayoutProviderProps {
  children: React.ReactNode;
}

function LayoutProvider({ children }: LayoutProviderProps) {
  const initialKey = useLayoutKey('query');

  const [key, _setKey] = useState(initialKey);

  const value = LayoutUtils.schema.getValue(key);

  const setKey = useCallback((key: LayoutUtils.Key) => _setKey(key), []);

  return (
    <LayoutContext.Provider value={{ key, value, setKey }}>
      {children}
    </LayoutContext.Provider>
  );
}

export default LayoutProvider;
