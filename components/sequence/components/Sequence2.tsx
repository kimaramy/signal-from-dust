'use client';

import React, { useCallback, useEffect } from 'react';

import { cn } from '@/lib/css';
import { IntlMessageFormat, useLocaleDictionary } from '@/lib/i18n';
import { SceneCardView } from '@/components/scene';
import { SceneUtils, type SceneData } from '@/components/scene/lib';

import type { SequenceProps } from './Sequence';
import { useActiveScene } from './Sequence.hooks';

function Sequence2({ id, sceneDataset, className }: SequenceProps) {
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

  const handleRef = useCallback((el: HTMLElement | null) => {
    if (el !== null) {
      const offsetY = el.getBoundingClientRect().top;
      el.style.minHeight = `calc(100dvh - ${offsetY}px)`;
    }
  }, []);

  useEffect(() => {
    window?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [sceneDataset]);

  return (
    <article
      id={id}
      ref={handleRef}
      className={cn(
        'grid h-full w-full min-w-[280px] grid-cols-1 content-start gap-2 overflow-x-hidden overflow-y-scroll p-4 scrollbar-hide md:grid-cols-2 md:gap-3 lg:content-center xl:grid-cols-3',
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
            sceneDescription={dictionary.dataset.description}
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

export default Sequence2;
