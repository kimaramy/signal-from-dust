'use client';

import { useCallback, useState } from 'react';

import type { BaseProviderProps } from '@/lib/react-types';

import { DatasetOrderContext } from './contexts';
import { DatasetOrderUtils } from './schemes';

function DatasetOrderProvider({ children }: BaseProviderProps) {
  const [key, _setKey] = useState(DatasetOrderUtils.schema.defaultKey);

  const setKey = useCallback(
    (newKey: DatasetOrderUtils.Key) => _setKey(newKey),
    []
  );

  return (
    <DatasetOrderContext.Provider value={{ key, setKey }}>
      {children}
    </DatasetOrderContext.Provider>
  );
}

export { DatasetOrderProvider };
