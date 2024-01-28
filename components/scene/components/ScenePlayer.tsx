'use client';

import React from 'react';

import { useScenePlayer, UseScenePlayerParams } from './Scene.hooks';

interface ScenePlayerProps extends UseScenePlayerParams {
  children: (scenePlayer: ReturnType<typeof useScenePlayer>) => React.ReactNode;
}

function ScenePlayer({ children, ...scenePlayerParams }: ScenePlayerProps) {
  const scenePlayer = useScenePlayer(scenePlayerParams);
  return <>{children(scenePlayer)}</>;
}

export default ScenePlayer;
