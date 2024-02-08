'use client';

import { useCallback, useState } from 'react';

import { DatasetOrderContext } from '../context';
import { DatasetOrderUtils } from '../schema';

interface DatasetOrderProviderProps {
  children: React.ReactNode;
}

function DatasetOrderProvider({ children }: DatasetOrderProviderProps) {
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

export default DatasetOrderProvider;
