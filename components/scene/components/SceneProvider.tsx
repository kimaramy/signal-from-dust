'use client';

import { SceneContext } from '../context';
import { useSceneState, type UseSceneStateParams } from '../hooks';

export interface SceneProviderProps extends UseSceneStateParams {
  children: React.ReactNode;
}

function SceneProvider({
  children,
  ...useSceneStateParams
}: SceneProviderProps) {
  const sceneState = useSceneState(useSceneStateParams);
  return (
    <SceneContext.Provider value={sceneState}>{children}</SceneContext.Provider>
  );
}

export default SceneProvider;
