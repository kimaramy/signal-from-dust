'use client';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/css';
import { useBitContext } from '@/components/bit';

import { useSceneContext } from '../hooks';

const sceneBitsVariants = cva(
  'flex divide-x divide-ring border rounded-md overflow-hidden border-ring font-mono text-sm font-semibold tracking-wider text-accent-foreground dark:divide-white dark:border-white sm:text-base'
);

const sceneBitVariants = cva(
  'inline-flex h-full flex-auto items-center justify-center px-1.5 py-0.5 sm:px-2',
  {
    variants: {
      state: {
        isActive:
          'bg-primary/10 backdrop-hue-rotate-90 dark:bg-primary dark:text-primary-foreground',
      },
    },
    defaultVariants: {
      state: undefined,
    },
  }
);

function SceneBits({
  className,
  ...rest
}: React.HTMLAttributes<HTMLOListElement>) {
  const sceneContext = useSceneContext();

  const bitContext = useBitContext({ strict: false });

  const _activeBitIdx =
    sceneContext.getActiveBit()?.id ?? bitContext?.selectedBitIdx;

  return (
    <ol className={cn(sceneBitsVariants({ className }))} {...rest}>
      {sceneContext.bits
        .filter((bit) => !bit.isVacant)
        .map((bit, bitIdx) => {
          const isActiveBit = bitIdx === _activeBitIdx;
          return (
            <li
              key={`${bitIdx}`}
              className={cn(
                sceneBitVariants({
                  state: isActiveBit ? 'isActive' : undefined,
                })
              )}
            >
              {bit.value}
            </li>
          );
        })}
    </ol>
  );
}

export default SceneBits;
