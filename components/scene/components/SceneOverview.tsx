'use client';

import React, { useMemo } from 'react';

import { cn } from '@/lib/css';
import { IntlMessageFormat, useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import { DustUtils } from '@/lib/model';
import { DustThumbnail } from '@/components/dust';

import { useBitContext, useSceneContext } from '../hooks';

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
    sceneContext.getActiveBit()?.idx ?? bitContext.activeBitIdx;

  return (
    <p className="inline-block divide-x divide-ring border border-ring font-mono text-base font-semibold tracking-wider text-accent-foreground dark:divide-white dark:border-white">
      {sceneContext.bits.map((bit) => {
        const isActiveBit = bit.idx === _activeBitIdx;
        return (
          <span
            key={`${bit.idx}`}
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

function SceneOverview() {
  const {
    dictionary: { dataset },
  } = useLocaleDictionary();

  const { sceneData } = useSceneContext();

  const dustGrade = DustUtils.schema.getGrade(
    sceneData.value ?? 0,
    sceneData._ctx.dustKey
  );

  const source = useMemo(() => {
    const { label, description } = dataset;
    const { collection, dust, yearRange, location, dates } = sceneData.display;
    const name = [dust, dates.join(', ')].join(', ');
    const source = new IntlMessageFormat(dataset.source).format({
      collection,
      dust,
      yearRange,
      location,
    });
    return { label, name, source, description };
  }, [dataset, sceneData]);

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
          <h3 className="text-lg font-bold text-foreground">{source.name}</h3>
          <h4 className="pl-px text-xs tracking-tight text-muted-foreground">
            {[source.label, source.source].join(' : ')}
          </h4>
        </div>
      </div>
      <div className="flex h-full flex-col justify-center p-4">
        <h4 className="pb-2 text-sm tracking-tight text-muted-foreground">
          {source.description}
        </h4>
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
