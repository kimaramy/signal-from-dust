import React from 'react';

import { useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import { DataNameUtils, DustUtils } from '@/lib/model';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import type { SceneData } from './utils';

interface SceneOverviewProps {
  sceneData: SceneData;
  bits: string[];
  isPlaying: boolean;
  onPlayButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

function SceneOverview({
  sceneData,
  bits,
  isPlaying,
  onPlayButtonClick,
}: SceneOverviewProps) {
  const { locale } = useLocaleDictionary();

  const dustGrade = DustUtils.getGrade(
    sceneData.value ?? 0,
    sceneData.name as DataNameUtils.Key
  );

  const title = [sceneData.displayName, sceneData.dates.join(', ')].join(', ');

  return (
    <div className="flex h-auto items-center overflow-hidden">
      <div className="flex gap-3 rounded-md p-4">
        <Button
          variant="ghost"
          size="icon"
          className="inline-flex h-11 w-11 items-center justify-center rounded bg-black/20 text-black/50 dark:bg-white/20"
          onClick={onPlayButtonClick}
        >
          {isPlaying ? (
            <Icon.Pause className="h-6 w-6" />
          ) : (
            <Icon.Play className="h-6 w-6" />
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
      <Separator orientation="vertical" className="mx-1" />
      <div className="flex h-full flex-col justify-center p-4">
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
            {sceneData.value}({DustUtils.unit})
          </p>
          <Icon.ArrowRight className="h-4 w-4" />
          <p className="inline-block divide-x divide-ring border border-ring font-mono text-base font-semibold tracking-wider text-accent-foreground dark:divide-white dark:border-white">
            {bits.map((bit, bitIdx) => (
              <span
                key={`${bit}-${bitIdx}`}
                className="inline-flex items-center justify-center px-1.5 py-0.5"
              >
                {bit}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SceneOverview;
