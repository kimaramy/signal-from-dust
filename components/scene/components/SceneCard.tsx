'use client';

import { cn } from '@/lib/css';
import { DustUtils } from '@/lib/model';
import type { BitData } from '@/components/bit';
import { DustThumbnail } from '@/components/dust';

import { useSceneContext } from '../hooks';
import { PlayerOverlayButton } from './PlayerButton';
import { SceneSubtitle, SceneTitle } from './SceneTypography';

interface SceneCardProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  isPlayerHidden?: boolean;
  isPlaying?: boolean;
  isolated?: boolean;
  className?: string;
  onPlay?: (sceneContext: { bits: BitData[] }) => void;
}

function SceneCard(props: SceneCardProps) {
  const {
    title,
    subtitle,
    isPlayerHidden = false,
    isPlaying = false,
    isolated = false,
    className,
    onPlay,
  } = props;

  const { sceneData, bits } = useSceneContext();

  const dustGrade = DustUtils.schema.getGrade(
    sceneData.value ?? 0,
    sceneData._ctx.dustKey
  );

  return (
    <div
      className={cn(
        'group flex flex-nowrap items-center gap-4',
        isolated &&
          'cursor-pointer hover:backdrop-hue-rotate-90 dark:hover:backdrop-grayscale',
        className
      )}
    >
      {/* thumbnail */}
      <div className="relative z-0 aspect-square w-12 flex-none overflow-hidden rounded md:w-16">
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
        <SceneTitle>{title}</SceneTitle>
        <SceneSubtitle>{subtitle}</SceneSubtitle>
      </div>
    </div>
  );
}

export default SceneCard;
