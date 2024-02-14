'use client';

import React from 'react';

import { useSceneContext } from '../lib';
import {
  useScenePlayer,
  useScenePlayerEffect,
  type UseScenePlayerParams,
} from './ScenePlayer.hooks';

interface ScenePlayerProps extends UseScenePlayerParams {
  children: (
    scenePlayer: Pick<
      ReturnType<typeof useScenePlayer>,
      | 'isPlaying'
      | 'isPaused'
      | 'handlePlayer'
      | 'handlePauseablePlayer'
      | 'handlePlay'
      | 'handleStop'
      | 'handlePause'
      | 'togglePlaying'
    >
  ) => React.ReactNode;
}

function ScenePlayer({ children, ...rest }: ScenePlayerProps) {
  const sceneContext = useSceneContext();

  const {
    isPlaying,
    isPaused,
    bitDurationAsSecond,
    handlePlayer,
    handlePauseablePlayer,
    handlePlay,
    handleStop,
    handlePause,
    togglePlaying,
  } = useScenePlayer(rest);

  useScenePlayerEffect({
    sceneContext,
    isPlaying,
    isPaused,
    bitDurationAsSecond,
  });

  return (
    <>
      {children({
        isPlaying,
        isPaused,
        handlePlayer,
        handlePauseablePlayer,
        handlePlay,
        handleStop,
        handlePause,
        togglePlaying,
      })}
    </>
  );
}

export default ScenePlayer;
