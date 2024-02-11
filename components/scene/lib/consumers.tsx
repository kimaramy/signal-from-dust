'use client';

import type { BaseConsumerProps } from '@/lib/react-types';

import {
  SceneContext,
  SceneContextError,
  type SceneContextValue,
} from './contexts';

function SceneConsumer({ children }: BaseConsumerProps<SceneContextValue>) {
  return (
    <SceneContext.Consumer>
      {(sceneContext) => {
        if (!sceneContext) {
          throw SceneContextError(SceneConsumer.name);
        }
        return children(sceneContext);
      }}
    </SceneContext.Consumer>
  );
}

export { SceneConsumer };
