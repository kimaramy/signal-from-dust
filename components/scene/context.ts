import { createContext } from 'react';

import {
  CollectionUtils,
  DustUtils,
  SeasonUtils,
  type Locale,
} from '@/lib/model';
import type { BitData } from '@/components/bit';

interface SceneData {
  id: number;
  value: number | null;
  rank?: number | null;
  display: {
    location: string;
    dust: string;
    collection?: string;
    yearRange?: string;
    year?: string;
    month?: string;
    season?: string;
    week?: string;
    dates: [string, ...string[]];
  };
  _ctx: {
    locale: Locale;
    dustKey: DustUtils.Key;
    collectionKey?: CollectionUtils.Key;
    seasonKey?: SeasonUtils.Key;
  };
}

interface SceneContextValue {
  sceneIdx: number;
  sceneData: SceneData;
  bits: BitData[];
  setBits: (bits: BitData[]) => void;
  resetBits: () => void;
  getActiveBit: () => BitData | null;
  setActiveBit: (bitIdx: number) => void;
}

const SceneContext = createContext<SceneContextValue | null>(null);

const SceneContextError = (caller: string) =>
  new Error(`${caller} must be called within a SceneContext.Provider`);

export {
  SceneContext,
  SceneContextError,
  type SceneData,
  type SceneContextValue,
};
