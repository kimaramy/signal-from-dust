import React, { createContext } from 'react';

import { CollectionUtils, DustUtils, type Locale } from '@/lib/model';

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

type Bit = { idx: number; value: string; isActive: boolean };

interface SceneContextValue {
  sceneIdx: number;
  sceneData: SceneData;
  bits: Bit[];
  setBits: React.Dispatch<React.SetStateAction<Bit[]>>;
  resetBits: () => void;
  getActiveBit: () => Bit | null;
  setActiveBit: (bitIdx: number) => void;
}

type ActiveBitIdx = number | null;

interface BitContextValue {
  activeBitIdx: ActiveBitIdx;
  setActiveBitIdx: React.Dispatch<React.SetStateAction<ActiveBitIdx>>;
  resetActiveBitIdx: () => void;
}

const SceneContext = createContext<SceneContextValue | null>(null);

const BitContext = createContext<BitContextValue | null>(null);

export {
  SceneContext,
  BitContext,
  type SceneData,
  type SceneContextValue,
  type BitContextValue,
  type ActiveBitIdx,
};
