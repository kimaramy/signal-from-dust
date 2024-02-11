'use client';

import type { BaseProviderProps } from '@/lib/react-types';

import { SceneContext } from './contexts';
import { useSceneState, type UseSceneStateParams } from './hooks';

interface SceneProviderProps extends BaseProviderProps, UseSceneStateParams {}

function SceneProvider({
  children,
  ...useSceneStateParams
}: SceneProviderProps) {
  return (
    <SceneContext.Provider value={useSceneState(useSceneStateParams)}>
      {children}
    </SceneContext.Provider>
  );
}

export { SceneProvider };
