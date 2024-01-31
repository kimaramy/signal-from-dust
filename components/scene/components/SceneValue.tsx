'use client';

import { cn } from '@/lib/css';
import { Icon } from '@/lib/icon';
import { DustUtils } from '@/lib/model';
import { useBitContext } from '@/components/bit';

import { useSceneContext } from '../hooks';

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

  const bitContext = useBitContext({ strict: false });

  const _activeBitIdx =
    sceneContext.getActiveBit()?.id ?? bitContext?.selectedBitIdx;

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

function SceneValue() {
  return (
    <div className="flex items-center gap-2">
      <DustValueView />
      <Icon.ArrowRight aria-hidden className="h-4 w-4" />
      <BitsView />
    </div>
  );
}

export default SceneValue;
