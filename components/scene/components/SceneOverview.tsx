'use client';

import React, { useMemo } from 'react';

import { cn } from '@/lib/css';
import { IntlMessageFormat, useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import { DustUtils } from '@/lib/model';
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
  const {
    dictionary: { dataset },
  } = useLocaleDictionary();

  const { sceneData } = useSceneContext();

  const dustGrade = DustUtils.schema.getGrade(
    sceneData.value ?? 0,
    sceneData._ctx.dustKey
  );

  const title = [
    sceneData.display.dust,
    sceneData.display.dates.join(', '),
  ].join(', ');

  const source = useMemo(() => {
    const { prefix, description } = dataset;
    const { collection, dust, yearRange, location } = sceneData.display;
    const source = new IntlMessageFormat(dataset.source).format({
      collection,
      dust,
      yearRange,
      location,
    });
    return { prefix, source, description };
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
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <h4 className="pl-px text-xs tracking-tight text-muted-foreground">
            {[source.prefix, source.source].join(' : ')}
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
