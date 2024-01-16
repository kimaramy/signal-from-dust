'use client';

import React from 'react';

import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import { DustUtils } from '@/lib/model';
import { Separator } from '@/components/ui/separator';
import { DustThumbnail } from '@/components/dust';

import { useActiveBitContext, useSceneContext } from '../hooks';

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
  const { bits } = useSceneContext();

  const { activeBitIdx } = useActiveBitContext();

  return (
    <p className="inline-block divide-x divide-ring border border-ring font-mono text-base font-semibold tracking-wider text-accent-foreground dark:divide-white dark:border-white">
      {bits.map((bit, bitIdx) => {
        const isActiveBit = bitIdx === activeBitIdx;
        return (
          <span
            key={`${bit}-${bitIdx}`}
            className={cn(
              'inline-flex items-center justify-center px-2 py-0.5',
              isActiveBit &&
                'bg-ring dark:bg-primary dark:text-primary-foreground'
            )}
          >
            {bit}
          </span>
        );
      })}
    </p>
  );
}

function SceneOverview() {
  const { locale } = useLocaleDictionary();

  const { sceneData } = useSceneContext();

  const dustGrade = DustUtils.schema.getGrade(
    sceneData.value ?? 0,
    sceneData._ctx.dustKey
  );

  const title = [
    sceneData.display.dust,
    sceneData.display.dates.join(', '),
  ].join(', ');

  return (
    <div className="flex h-auto items-center overflow-hidden">
      <div className="flex gap-4 rounded-md p-4">
        <DustThumbnail
          dustGrade={dustGrade.name}
          fileSize="360x360"
          width={64}
          height={64}
          loading="lazy"
          className="rounded object-cover"
        />
        <div className="flex flex-col justify-center space-y-0.5">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <h4 className="pl-px text-xs tracking-tight text-muted-foreground">
            {locale === 'en' ? 'Source' : '데이터'} :{' '}
            {[
              `${sceneData.display.collection} ${sceneData.display.dust} ${
                locale === 'en' ? 'Average' : '평균'
              }`,
              `${locale === 'en' ? `2015~2022` : `2015~2022년`}`,
              sceneData.display.location,
            ].join(', ')}
          </h4>
        </div>
      </div>
      <Separator orientation="vertical" className="mx-1" />
      <div className="flex h-full flex-col justify-center p-4">
        <h4 className="pb-2 text-sm tracking-tight text-muted-foreground">
          {locale === 'en'
            ? 'This is the result of a binary signal output of the measurement'
            : '측정 수치를 2진 신호로 출력한 결과입니다'}
        </h4>
        <div className="flex items-center gap-2">
          <DustValueView />
          <Icon.ArrowRight className="h-4 w-4" />
          <BitsView />
        </div>
      </div>
    </div>
  );
}

export default SceneOverview;
