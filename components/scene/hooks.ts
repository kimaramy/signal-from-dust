import { useContext } from 'react';

import { SceneContext } from './context';

function useSceneContext() {
  const sceneContext = useContext(SceneContext);
  if (!sceneContext) {
    throw new Error(
      `useSceneContext must be called within a SceneContext.Provider`
    );
  }
  return sceneContext;
}

export { useSceneContext };
