'use client';

import React, { useCallback, useEffect } from 'react';

import { cn } from '@/lib/css';
import { IntlMessageFormat, useLocaleDictionary } from '@/lib/i18n';
import { SceneCardView, SceneUtils, type SceneData } from '@/components/scene';

import type { SequenceProps } from './Sequence';
import { useActiveScene } from './Sequence.hooks';

const Sequence2 = React.forwardRef<HTMLDivElement, SequenceProps>(
  function Sequence2({ id, sceneDataset, className }, ref) {
    const values = sceneDataset.map((sceneData) => sceneData.value ?? 0);

    const { dictionary } = useLocaleDictionary();

    const {
      activeSceneIdx,
      setActiveSceneIdx,
      resetActiveSceneIdx,
      validateOtherSceneActive,
    } = useActiveScene();

    const handleSceneTitle = useCallback(
      (sceneData: SceneData) => {
        const { dust, dates } = sceneData.display;
        const title =
          sceneData._ctx.collectionKey === 'YEARLY'
            ? new IntlMessageFormat(dictionary.dataset.year_title).format({
                dust,
                year: dates[0],
              })
            : new IntlMessageFormat(dictionary.dataset.title).format({
                dust,
                primaryDate: dates[0],
                secondaryDate: dates[1],
              });
        return title as string;
      },
      [dictionary]
    );

    const handleSceneSubtitle = useCallback(
      (sceneData: SceneData) => {
        const { collection, dust, yearRange, location } = sceneData.display;
        const title = [
          dictionary.dataset.label,
          new IntlMessageFormat(dictionary.dataset.source).format({
            collection,
            dust,
            yearRange,
            location,
          }),
        ].join(' : ');
        return title;
      },
      [dictionary]
    );

    useEffect(() => {
      window?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, [sceneDataset]);

    return (
      <article
        id={id}
        ref={ref}
        className={cn(
          'grid h-full min-h-screen w-full min-w-[280px] grid-cols-1 content-center items-center gap-2 overflow-auto p-4 scrollbar-hide md:grid-cols-2 md:gap-3 lg:grid-cols-3 lg:overflow-x-hidden',
          className
        )}
      >
        {sceneDataset.map((sceneData, sceneIdx) => {
          const sceneId = SceneUtils.getSceneId(id, sceneData.id);
          return (
            <SceneCardView
              key={sceneId}
              sceneId={sceneId}
              sceneIdx={sceneIdx}
              sceneData={sceneData}
              sceneLength={SceneUtils.getSceneLength(Math.max(...values))}
              sceneTitle={handleSceneTitle}
              sceneSubtitle={handleSceneSubtitle}
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

export default Sequence2;
