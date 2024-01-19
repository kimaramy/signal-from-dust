import { useContext } from 'react';

import { BitContext, SceneContext } from './context';

function useSceneContext() {
  const sceneContext = useContext(SceneContext);
  if (!sceneContext) {
    throw new Error(
      `useSceneContext must be called within a SceneContext.Provider`
    );
  }
  return sceneContext;
}

function useBitContext() {
  const bitContext = useContext(BitContext);
  if (!bitContext) {
    throw new Error(
      `useBitContext must be called within a BitContext.Provider`
    );
  }
  return bitContext;
}

export { useSceneContext, useBitContext };
