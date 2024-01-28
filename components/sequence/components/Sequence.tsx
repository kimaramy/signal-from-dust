'use client';

import React, { useEffect } from 'react';

import { cn } from '@/lib/css';
import { IntlMessageFormat, useLocaleDictionary } from '@/lib/i18n';
import { SceneUtils, SceneView, type SceneData } from '@/components/scene';

import { useActiveScene } from './Sequence.hooks';

export interface SequenceProps {
  sequenceId: string;
  sceneDataset: SceneData[];
  className?: string;
  revalidate?: () => void;
}

const Sequence = React.forwardRef<HTMLDivElement, SequenceProps>(
  function Sequence({ sequenceId, sceneDataset, className }, ref) {
    const { dictionary } = useLocaleDictionary();

    const values = sceneDataset.map((sceneData) => sceneData.value ?? 0);

    const {
      activeSceneIdx,
      setActiveSceneIdx,
      resetActiveSceneIdx,
      validateOtherSceneActive,
    } = useActiveScene();

    useEffect(() => {
      window?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, [sceneDataset]);

    return (
      <article
        id={sequenceId}
        ref={ref}
        className={cn(
          'grid h-full min-h-screen w-full min-w-md content-center items-center gap-2 overflow-auto overflow-y-scroll p-4 scrollbar-hide',
          className
        )}
        style={{
          gridTemplateRows: `repeat(${sceneDataset.length}, 2.25rem)`,
        }}
      >
        {sceneDataset.map((sceneData, sceneIdx) => {
          const sceneId = SceneUtils.getSceneId(sequenceId, sceneData.id);
          return (
            <SceneView
              key={sceneId}
              sceneId={sceneId}
              sceneIdx={sceneIdx}
              sceneData={sceneData}
              sceneLength={SceneUtils.getSceneLength(Math.max(...values))}
              sceneTitle={({ display: { dust, dates } }) =>
                sceneData._ctx.collectionKey === 'YEARLY'
                  ? new IntlMessageFormat(dictionary.dataset.year_title).format(
                      {
                        dust,
                        year: dates[0],
                      }
                    )
                  : new IntlMessageFormat(dictionary.dataset.title).format({
                      dust,
                      primaryDate: dates[0],
                      secondaryDate: dates[1],
                    })
              }
              sceneDescription={dictionary.dataset.description}
              sceneSource={({
                display: { collection, dust, yearRange, location },
              }) =>
                [
                  dictionary.dataset.label,
                  new IntlMessageFormat(dictionary.dataset.source).format({
                    collection,
                    dust,
                    yearRange,
                    location,
                  }),
                ].join(' : ')
              }
              isActive={activeSceneIdx === sceneIdx}
              isDisabled={validateOtherSceneActive(sceneIdx)}
              onPlay={setActiveSceneIdx}
              onStop={resetActiveSceneIdx}
            />
          );
        })}
      </article>
    );
  }
);

export default Sequence;
