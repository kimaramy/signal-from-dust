'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/css';
import { LayoutUtils } from '@/components/layout';

import { type SceneData } from '../lib';

const sceneListVariants = cva(
  'grid h-full w-full gap-2 overflow-x-hidden overflow-y-scroll py-4 scrollbar-hide px-safe-offset-4',
  {
    variants: {
      layout: {
        default: 'min-w-md content-center',
        responsive:
          'min-w-[280px] grid-cols-1 content-start md:grid-cols-2 md:gap-3 lg:content-center xl:grid-cols-3',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  }
);

interface SceneListProps
  extends Omit<React.ComponentPropsWithoutRef<'article'>, 'children'>,
    VariantProps<typeof sceneListVariants> {
  sceneDataset: SceneData[];
  layoutKey: LayoutUtils.Key;
  children: React.ReactNode | ((sceneDataset: SceneData[]) => React.ReactNode);
}

function SceneList({
  id,
  className,
  sceneDataset,
  layoutKey,
  children,
}: SceneListProps) {
  const styleCSS = useMemo<React.CSSProperties>(() => {
    if (layoutKey === 'DETAIL') {
      return { gridTemplateRows: `repeat(${sceneDataset.length}, 2.25rem)` };
    }
    return {};
  }, [layoutKey, sceneDataset.length]);

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
        sceneListVariants({
          layout: layoutKey === 'SHORT' ? 'responsive' : 'default',
          className,
        })
      )}
      style={styleCSS}
    >
      {typeof children === 'function' ? children(sceneDataset) : children}
    </article>
  );
}

export default SceneList;
