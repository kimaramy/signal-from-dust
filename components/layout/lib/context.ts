'use client';

import { createContext } from 'react';

import { LayoutUtils } from './schema';

type LayoutContextValue = {
  key: LayoutUtils.Key;
  value: LayoutUtils.Value;
  setKey: (key: LayoutUtils.Key) => void;
};

const LayoutContext = createContext<LayoutContextValue | null>(null);

const LayoutContextError = (caller: string) =>
  new Error(`${caller} must be called within a LayoutContext.Provider`);

export { LayoutContext, LayoutContextError, type LayoutContextValue };
