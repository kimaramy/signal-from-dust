'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/css';
import { DustUtils } from '@/lib/model';
import { type BitData } from '@/components/bit/lib';
import { DustThumbnail } from '@/components/dust';

import { useSceneContext } from '../lib';
import { PlayerOverlayButton } from './PlayerButton';
import SceneRank from './SceneRank';
import { SceneSubtitle, SceneTitle } from './SceneTypography';

const sceneCardVariants = cva('group flex flex-nowrap items-center gap-3 p-2', {
  variants: {
    view: {
      standalone:
        'w-full cursor-pointer rounded-md bg-primary/10 hover:backdrop-hue-rotate-90 dark:hover:backdrop-grayscale',
    },
    state: {
      active: 'backdrop-hue-rotate-90 dark:backdrop-grayscale',
    },
  },
  defaultVariants: {
    view: undefined,
    state: undefined,
  },
});

interface SceneCardProps
  extends Omit<
      React.ComponentPropsWithoutRef<'div'>,
      'title' | 'onPlay' | 'onPause'
    >,
    VariantProps<typeof sceneCardVariants> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  isPlayerHidden?: boolean;
  isPaused?: boolean;
  isPlaying?: boolean;
  onTogglePlay?: (sceneContext: { bits: BitData[] }) => void;
}

const SceneCard = React.forwardRef<HTMLDivElement, SceneCardProps>(
  function SceneCard(props, ref) {
    const {
      view,
      state,
      title,
      subtitle,
      isPlayerHidden = false,
      isPaused = false,
      isPlaying = false,
      className,
      onTogglePlay,
      ...rest
    } = props;

    const { sceneData, bits } = useSceneContext();

    const dustGrade = DustUtils.schema.getGrade(
      sceneData.value ?? 0,
      sceneData._ctx.dustKey
    );

    return (
      <div
        ref={ref}
        className={cn(sceneCardVariants({ view, state, className }))}
        {...rest}
      >
        {/* thumbnail */}
        <div className="relative z-0 aspect-square w-12 flex-none overflow-hidden rounded-md md:w-16">
          <DustThumbnail dustGrade={dustGrade.name} fileSize="360x360" fill />
          <PlayerOverlayButton
            isPlaying={isPlaying}
            isPaused={isPaused}
            isHidden={isPlayerHidden}
            className="z-10"
            onClick={() => onTogglePlay?.({ bits })}
          />
        </div>
        {/* title */}
        <div className="w-full flex-auto space-y-0.5 truncate">
          <div className="flex items-center gap-1.5">
            <SceneTitle>{title}</SceneTitle>
            <SceneRank />
          </div>
          {subtitle ? <SceneSubtitle>{subtitle}</SceneSubtitle> : null}
        </div>
      </div>
    );
  }
);

export default SceneCard;
