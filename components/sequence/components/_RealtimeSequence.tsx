'use client';

import React, { useCallback } from 'react';

import { cn } from '@/lib/css';
import { IntlMessageFormat, useLocaleDictionary } from '@/lib/i18n';
import {
  SceneScreenView,
  SceneUtils,
  type SceneData,
} from '@/components/scene';

import type { SequenceProps } from './Sequence';

interface RealtimeSequenceProps extends SequenceProps {
  revalidate: () => Promise<void>;
}

const RealtimeSequence = React.forwardRef<
  HTMLDivElement,
  RealtimeSequenceProps
>(function RealtimeSequence(props, ref) {
  const { id, sceneDataset, revalidate, className } = props;

  const values = sceneDataset.map((sceneData) => sceneData.value ?? 0);

  const { dictionary } = useLocaleDictionary();

  const handleSceneTitle = useCallback(
    (sceneData: SceneData) => {
      const { location, dust } = sceneData.display;
      const title = new IntlMessageFormat(
        dictionary.dataset.realtime_title
      ).format({
        location,
        dust,
      });
      return title as string;
    },
    [dictionary]
  );

  const handleSceneSubtitle = useCallback(
    (sceneData: SceneData) => {
      const { location } = sceneData.display;
      const title = [
        dictionary.dataset.label,
        new IntlMessageFormat(dictionary.dataset.realtime_source).format({
          location,
        }),
      ].join(' : ');
      return title;
    },
    [dictionary]
  );

  return (
    <article
      id={id}
      ref={ref}
      className={cn(
        'h-auto w-full min-w-lg overflow-auto scrollbar-hide lg:overflow-x-hidden',
        className
      )}
    >
      {sceneDataset.map((sceneData, sceneIdx) => {
        const sceneId = SceneUtils.getSceneId(id, sceneData.id);
        return (
          <SceneScreenView
            key={sceneId}
            sceneId={sceneId}
            sceneIdx={sceneIdx}
            sceneData={sceneData}
            sceneLength={SceneUtils.getSceneLength(Math.max(...values))}
            sceneTitle={handleSceneTitle}
            sceneSubtitle={handleSceneSubtitle}
            sceneDescription={dictionary.dataset.description}
            revalidate={revalidate}
          />
        );
      })}
    </article>
  );
});

export default RealtimeSequence;
