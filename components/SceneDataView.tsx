import React from 'react';
import { ArrowRightIcon, PauseIcon, PlayIcon } from '@heroicons/react/20/solid';

import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { DataNameUtils } from '@/lib/model';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { type DisplayKey } from '@/components/display';
import { Dust } from '@/components/dust';

import type { Binary } from './Bit';
import type { SceneData } from './Scene';

interface SceneDataViewProps {
  displayKey: DisplayKey;
  sceneData: SceneData;
  binaries?: Binary[];
  isPlaying: boolean;
  onPlayButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

function SceneDataView({
  sceneData,
  binaries,
  displayKey,
  isPlaying,
  onPlayButtonClick,
}: SceneDataViewProps) {
  const { locale } = useLocaleDictionary();

  const isFullPage = displayKey === 'FULL';

  const dustGrade = Dust.getGrade(
    sceneData.value ?? 0,
    sceneData.name as DataNameUtils.Key
  );

  const title = [sceneData.displayName, sceneData.dates.join(', ')].join(', ');

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
            {locale === 'en' ? 'Source' : '데이터'} :{' '}
            {[
              `${sceneData.collection} ${sceneData.displayName} ${
                locale === 'en' ? 'Average' : '평균'
              }`,
              `${locale === 'en' ? `2015~2022` : `2015~2022년`}`,
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
          {locale === 'en'
            ? 'This is the result of a binary signal output of the average figure'
            : '평균 수치를 2진 신호로 출력한 결과입니다'}
        </h4>
        <div className="flex items-center gap-2">
          <p
            className="rounded border border-current px-2 py-1 text-sm font-semibold !text-black"
            style={{
              backgroundColor: dustGrade.color,
              borderColor: dustGrade.color,
            }}
          >
            {sceneData.value}({Dust.unit})
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
        </div>
      </div>
    </div>
  );
}

export default SceneDataView;
