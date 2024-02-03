'use client';

import React from 'react';

import { useSceneContext } from '../hooks';
import {
  useScenePlayer,
  useScenePlayerEffect,
  type UseScenePlayerParams,
} from './ScenePlayer.hooks';

interface ScenePlayerProps extends UseScenePlayerParams {
  children: (
    scenePlayer: Pick<
      ReturnType<typeof useScenePlayer>,
      'isPlaying' | 'handlePlayer'
    >
  ) => React.ReactNode;
}

function ScenePlayer({ children, ...rest }: ScenePlayerProps) {
  const sceneContext = useSceneContext();

  const { isPlaying, bitDurationAsSecond, handlePlayer } = useScenePlayer(rest);

  useScenePlayerEffect({ sceneContext, isPlaying, bitDurationAsSecond });

  return <>{children({ isPlaying, handlePlayer })}</>;
}

export default ScenePlayer;
