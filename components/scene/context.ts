import React, { createContext } from 'react';

interface SceneData {
  id: number;
  name: string;
  displayName: string;
  value: number | null;
  collection: string;
  dates: string[];
  location: string;
  rank: number | null;
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
