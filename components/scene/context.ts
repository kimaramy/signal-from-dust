import React, { createContext } from 'react';

import { DustUtils, type Locale } from '@/lib/model';

interface SceneData {
  id: number;
  value: number | null;
  rank: number | null;
  display: {
    collection: string;
    yearRange: string;
    dust: string;
    location: string;
    dates: [string, ...string[]];
  };
  _ctx: {
    locale: Locale;
    dustKey: DustUtils.Key;
  };
}

type ActiveBitIdx = number | null;

interface SceneContextValue {
  sceneIdx: number;
  sceneData: SceneData;
  bits: string[];
}

interface ScenePlayerContextValue {
  isPlaying: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ActiveBitContextValue {
  activeBitIdx: ActiveBitIdx;
  setActiveBitIdx: React.Dispatch<React.SetStateAction<ActiveBitIdx>>;
  resetActiveBitIdx: () => void;
}

const SceneContext = createContext<SceneContextValue | null>(null);

const ScenePlayerContext = createContext<ScenePlayerContextValue | null>(null);

const ActiveBitContext = createContext<ActiveBitContextValue | null>(null);

export {
  SceneContext,
  ScenePlayerContext,
  ActiveBitContext,
  type SceneData,
  type ActiveBitIdx,
  type SceneContextValue,
  type ScenePlayerContextValue,
  type ActiveBitContextValue,
};
