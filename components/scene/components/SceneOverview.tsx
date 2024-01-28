'use client';

import React from 'react';

import { cn } from '@/lib/css';
import { Icon } from '@/lib/icon';
import { DustUtils } from '@/lib/model';
import { useBitContext, type BitData } from '@/components/bit';
import { DustThumbnail } from '@/components/dust';

import { useSceneContext } from '../hooks';
import PlayerButton from './PlayerButton';

function DustValueView() {
  const { sceneData } = useSceneContext();

  const dustGrade = DustUtils.schema.getGrade(
    sceneData.value ?? 0,
    sceneData._ctx.dustKey
  );

  return (
    <p
      className="rounded border border-current px-2 py-1 text-sm font-semibold !text-black"
      style={{
        backgroundColor: dustGrade.color,
        borderColor: dustGrade.color,
      }}
    >
      {sceneData.value}({DustUtils.schema.unit})
    </p>
  );
}

function BitsView() {
  const sceneContext = useSceneContext();

  const bitContext = useBitContext();

  const _activeBitIdx =
    sceneContext.getActiveBit()?.id ?? bitContext.selectedBitIdx;

  return (
    <p className="inline-block divide-x divide-ring border border-ring font-mono text-base font-semibold tracking-wider text-accent-foreground dark:divide-white dark:border-white">
      {sceneContext.bits
        .filter((bit) => !bit.isVacant)
        .map((bit, bitIdx) => {
          const isActiveBit = bitIdx === _activeBitIdx;
          return (
            <span
              key={`${bitIdx}`}
              className={cn(
                'inline-flex items-center justify-center px-2 py-0.5',
                isActiveBit &&
                  'bg-ring dark:bg-primary dark:text-primary-foreground'
              )}
            >
              {bit.value}
            </span>
          );
        })}
    </p>
  );
}

interface SceneOverviewProps {
  title: React.ReactNode;
  description: React.ReactNode;
  labelledSource: React.ReactNode;
  isPlayerHidden?: boolean;
  isPlaying?: boolean;
  onPlayerButtonClick?: (context: { bits: BitData[] }) => void;
}

function SceneOverview({
  title,
  description,
  labelledSource,
  isPlayerHidden = false,
  isPlaying = false,
  onPlayerButtonClick,
}: SceneOverviewProps) {
  const { sceneData, bits } = useSceneContext();

  const dustGrade = DustUtils.schema.getGrade(
    sceneData.value ?? 0,
    sceneData._ctx.dustKey
  );

  return (
    <div className="group flex h-auto items-center divide-x divide-border overflow-hidden">
      <div className="flex gap-4 rounded-md p-4">
        <div className="relative h-16 w-16 overflow-hidden rounded">
          <DustThumbnail
            dustGrade={dustGrade.name}
            fileSize="360x360"
            fill
            loading="lazy"
            className="object-cover"
          />
          {!isPlayerHidden && (
            <PlayerButton
              isPlaying={isPlaying}
              iconClassName="w-6 h-6"
              className="absolute left-0 top-0 z-20 h-full w-full rounded-none backdrop-opacity-90 group-hover:bg-primary/50 group-hover:text-primary-foreground"
              onClick={() => onPlayerButtonClick?.({ bits })}
            />
          )}
        </div>
        <div className="flex flex-col justify-center space-y-0.5">
          {typeof title === 'string' ? (
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              {title}
            </h3>
          ) : (
            title
          )}
          {typeof labelledSource === 'string' ? (
            <h4 className="pl-px text-xs tracking-tight text-muted-foreground">
              {labelledSource}
            </h4>
          ) : (
            labelledSource
          )}
        </div>
      </div>
      <div className="mx-2 flex h-full flex-col justify-center p-4">
        {typeof description === 'string' ? (
          <p className="pb-2 text-sm tracking-tight text-muted-foreground">
            {description}
          </p>
        ) : (
          description
        )}
        <div className="flex items-center gap-2">
          <DustValueView />
          <Icon.ArrowRight aria-hidden className="h-4 w-4" />
          <BitsView />
        </div>
      </div>
    </div>
  );
}

export default SceneOverview;
