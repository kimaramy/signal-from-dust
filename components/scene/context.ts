import React, { createContext } from 'react';

import { CollectionUtils, DustUtils, type Locale } from '@/lib/model';
import type { BitData } from '@/components/bit';

interface SceneData {
  id: number;
  value: number | null;
  rank: number | null;
  display: {
    collection: string;
    yearRange: string;
    dust: string;
    location: string;
    year?: string;
    month?: string;
    season?: string;
    week?: string;
    dates: [string, ...string[]];
  };
  _ctx: {
    locale: Locale;
    collectionKey: CollectionUtils.Key;
    dustKey: DustUtils.Key;
  };
}

interface SceneContextValue {
  sceneIdx: number;
  sceneData: SceneData;
  bits: BitData[];
  setBits: React.Dispatch<React.SetStateAction<BitData[]>>;
  resetBits: () => void;
  getActiveBit: () => BitData | null;
  setActiveBit: (bitIdx: number) => void;
}

const SceneContext = createContext<SceneContextValue | null>(null);

export { SceneContext, type SceneData, type SceneContextValue };
