'use client';

import React from 'react';

import { cn } from '@/lib/css';
import { IntlMessageFormat, useLocaleDictionary } from '@/lib/i18n';
import { SceneScreenView, SceneUtils } from '@/components/scene';

import type { SequenceProps } from './Sequence';

const ScreenSequence = React.forwardRef<HTMLDivElement, SequenceProps>(
  function ScreenSequence(props, ref) {
    const { sequenceId, sceneDataset, revalidate, className } = props;

    const { dictionary } = useLocaleDictionary();

    const values = sceneDataset.map((sceneData) => sceneData.value ?? 0);

    return (
      <article
        id={sequenceId}
        ref={ref}
        className={cn(
          'h-auto w-full overflow-y-scroll scrollbar-hide',
          className
        )}
      >
        {sceneDataset.map((sceneData, sceneIdx) => {
          const sceneId = SceneUtils.getSceneId(sequenceId, sceneData.id);
          return (
            <SceneScreenView
              key={sceneId}
              sceneId={sceneId}
              sceneIdx={sceneIdx}
              sceneData={sceneData}
              sceneLength={SceneUtils.getSceneLength(Math.max(...values))}
              sceneTitle={({ display: { location, dust } }) =>
                new IntlMessageFormat(dictionary.dataset.realtime_title).format(
                  {
                    location,
                    dust,
                  }
                )
              }
              sceneDescription={dictionary.dataset.description}
              sceneSource={({ display: { location } }) =>
                [
                  dictionary.dataset.label,
                  new IntlMessageFormat(
                    dictionary.dataset.realtime_source
                  ).format({
                    location,
                  }),
                ].join(' : ')
              }
              revalidate={revalidate}
            />
          );
        })}
      </article>
    );
  }
);

export default ScreenSequence;
