'use client';

import React from 'react';

import { useSceneContext } from '../hooks';
import {
  useScenePlayer,
  useScenePlayerEffect,
  UseScenePlayerParams,
} from './Scene.hooks';

interface ScenePlayerProps extends UseScenePlayerParams {
  children: (scenePlayer: ReturnType<typeof useScenePlayer>) => React.ReactNode;
}

function ScenePlayer({ children, ...rest }: ScenePlayerProps) {
  const sceneContext = useSceneContext();

  const scenePlayer = useScenePlayer(rest);

  useScenePlayerEffect({
    sceneContext,
    isPlaying: scenePlayer.isPlaying,
    intervalSecond: scenePlayer.bitDurationAsSecond,
  });

  return <>{children(scenePlayer)}</>;
}

export default ScenePlayer;
