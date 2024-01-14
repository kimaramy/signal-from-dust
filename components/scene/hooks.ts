import { useContext } from 'react';

import { ActiveBitContext, SceneContext, ScenePlayerContext } from './context';

function useSceneContext() {
  const sceneContext = useContext(SceneContext);
  if (!sceneContext) {
    throw new Error(
      `useSceneContext must be called within the SceneContext.Provider`
    );
  }
  return sceneContext;
}

function useScenePlayerContext() {
  const scenePlayerContext = useContext(ScenePlayerContext);
  if (!scenePlayerContext) {
    throw new Error(
      `useScenePlayerContext must be called within the ScenePlayerContext.Provider`
    );
  }
  return scenePlayerContext;
}

function useActiveBitContext() {
  const activeBitContext = useContext(ActiveBitContext);
  if (!activeBitContext) {
    throw new Error(
      `useActiveBitContext must be called within the ActiveBitContext.Provider`
    );
  }
  return activeBitContext;
}

export { useSceneContext, useScenePlayerContext, useActiveBitContext };
