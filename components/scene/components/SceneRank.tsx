'use client';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/css';

import { useSceneContext } from '../hooks';

const sceneRankVariants = cva(
  'inline-flex w-8 justify-center rounded-md bg-primary/20 py-0.5 font-mono text-xs text-primary-foreground dark:bg-primary/50'
);

function SceneRank({
  className,
  ...rest
}: Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>) {
  const { sceneData } = useSceneContext();

  if (typeof sceneData.rank !== 'number') return null;

  return (
    <span className={cn(sceneRankVariants({ className }))} {...rest}>
      #{sceneData.rank}
    </span>
  );
}

export default SceneRank;
