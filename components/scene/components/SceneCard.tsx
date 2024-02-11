'use client';

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
    variant: {
      isolated:
        'w-full cursor-pointer rounded-md bg-primary/10 hover:backdrop-hue-rotate-90 dark:hover:backdrop-grayscale',
    },
  },
  defaultVariants: {
    variant: undefined,
  },
});

interface SceneCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onPlay'>,
    VariantProps<typeof sceneCardVariants> {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  isPlayerHidden?: boolean;
  isPlaying?: boolean;
  onPlay?: (sceneContext: { bits: BitData[] }) => void;
}

function SceneCard(props: SceneCardProps) {
  const {
    title,
    subtitle,
    isPlayerHidden = false,
    isPlaying = false,
    variant,
    className,
    onPlay,
    ...rest
  } = props;

  const { sceneData, bits } = useSceneContext();

  const dustGrade = DustUtils.schema.getGrade(
    sceneData.value ?? 0,
    sceneData._ctx.dustKey
  );

  return (
    <div className={cn(sceneCardVariants({ variant, className }))} {...rest}>
      {/* thumbnail */}
      <div className="relative z-0 aspect-square w-12 flex-none overflow-hidden rounded-md md:w-16">
        <DustThumbnail dustGrade={dustGrade.name} fileSize="360x360" fill />
        <PlayerOverlayButton
          isPlaying={isPlaying}
          isHidden={isPlayerHidden}
          className="z-10"
          onClick={() => onPlay?.({ bits })}
        />
      </div>
      {/* title */}
      <div className="space-y-0.5 truncate">
        <div className="flex items-center gap-1.5">
          <SceneTitle>{title}</SceneTitle>
          <SceneRank />
        </div>
        <SceneSubtitle>{subtitle}</SceneSubtitle>
      </div>
    </div>
  );
}

export default SceneCard;
