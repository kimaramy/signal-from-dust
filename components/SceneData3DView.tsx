import React from 'react';
import { ArrowRightIcon, PauseIcon, PlayIcon } from '@heroicons/react/20/solid';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DustGrade, type DataNameKey } from '@/components/dataName';
import { type DisplayKey } from '@/components/display';

import type { Binary } from './Bit';
import type { SceneData } from './Scene';

interface SceneData3DViewProps {
  displayKey: DisplayKey;
  sceneData: SceneData;
  binaries?: Binary[];
  isPlaying: boolean;
  onPlayButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

function SceneData3DView(props: SceneData3DViewProps) {
  const { sceneData, binaries, displayKey, isPlaying, onPlayButtonClick } =
    props;

  const isFullPage = displayKey === 'FULL';

  const dustGrade = DustGrade.getGrade(
    sceneData.value ?? 0,
    sceneData.name as DataNameKey
  );

  const dustGradeColor = DustGrade.getGradeColor(dustGrade);

  const title = [sceneData.dates.join(' ') + '의', sceneData.displayName].join(
    ' '
  );

  return (
    <div
      className={cn(
        'flex h-auto items-center overflow-hidden',
        isFullPage &&
          'rounded-md border border-[#dfd7cb]/80 bg-[#dfd7cb]/80 shadow-sm dark:border-border dark:bg-body'
      )}
    >
      <div className="flex gap-3 rounded-md p-4">
        <Button
          variant="ghost"
          size="icon"
          className="inline-flex h-11 w-11 items-center justify-center rounded bg-black/20 text-black/50 dark:bg-white/20"
          onClick={onPlayButtonClick}
        >
          {isPlaying ? (
            <PauseIcon className="h-6 w-6" />
          ) : (
            <PlayIcon className="h-6 w-6" />
          )}
        </Button>
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <h4 className="pl-px text-xs tracking-tight text-muted-foreground">
            데이터 :{' '}
            {[
              `${sceneData.collection} ${sceneData.displayName} 평균`,
              `2015~2022년`,
              sceneData.location,
            ].join(', ')}
          </h4>
        </div>
      </div>
      {!isFullPage && <Separator orientation="vertical" className="mx-1" />}
      <div
        className={cn(
          'flex h-full flex-col justify-center p-4',
          isFullPage && 'rounded-l-lg bg-accent'
        )}
      >
        <h4 className="pb-2 text-sm tracking-tight text-muted-foreground">
          {title} 평균 수치를 2진 신호로 출력한 결과입니다
        </h4>
        <div className="flex items-center gap-2">
          <p
            className="rounded border border-current px-2 py-1 text-sm font-semibold !text-black"
            style={{
              backgroundColor: dustGradeColor,
              borderColor: dustGradeColor,
            }}
          >
            {sceneData.value}(㎍/㎥)
            {/* <span
              className="ml-1.5 inline-block rounded px-1 py-px text-[0.9em] text-black"
              style={{ backgroundColor: getDustGradeColor(dustGrade) }}
            >
              {dustGrade}
            </span> */}
          </p>
          <ArrowRightIcon className="h-4 w-4" />
          <p className="inline-block divide-x divide-ring border border-ring font-mono text-base font-semibold tracking-wider text-accent-foreground dark:divide-white dark:border-white">
            {binaries?.map((binary, i) => (
              <span
                key={`${binary}-${i}`}
                className="inline-flex items-center justify-center px-1.5 py-0.5"
              >
                {binary}
              </span>
            ))}
          </p>
          {/* <p className="inline-block divide-x divide-ring border border-ring font-mono text-base font-semibold tracking-wider text-accent-foreground">
            {binaries?.map((binary, i) => (
              <span
                key={`${binary}-${i}`}
                className="inline-flex items-center justify-center px-2 py-1"
              >
                {binary}
              </span>
            ))}
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default SceneData3DView;
