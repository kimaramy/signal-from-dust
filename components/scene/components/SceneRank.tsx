'use client';

import { cn } from '@/lib/css';

import { useSceneContext } from '../hooks';

function SceneRank({
  className,
  ...rest
}: Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>) {
  const { sceneData } = useSceneContext();

  if (typeof sceneData.rank !== 'number') return null;

  return (
    <span
      className={cn(
        'inline-flex w-8 justify-center rounded-md bg-primary/20 py-0.5 font-mono text-xs text-primary-foreground dark:bg-primary/50',
        className
      )}
      {...rest}
    >
      #{sceneData.rank}
    </span>
  );
}

export default SceneRank;
