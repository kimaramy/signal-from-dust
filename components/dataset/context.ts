'use client';

import { createContext } from 'react';

import { DatasetOrderUtils } from './schema';

type DatasetOrderContextValue = {
  key: DatasetOrderUtils.Key;
  setKey: (key: DatasetOrderUtils.Key) => void;
};

const DatasetOrderContext = createContext<DatasetOrderContextValue | null>(
  null
);

const DatasetOrderContextError = (caller: string) =>
  new Error(`${caller} must be called within a DatasetOrderContext.Provider`);

export {
  DatasetOrderContext,
  DatasetOrderContextError,
  type DatasetOrderContextValue,
};
