import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const sceneRootVariants = cva('relative flex h-full items-center gap-6', {
  variants: {
    justify: {
      start: 'justify-start',
      center: 'justify-center overflow-x-hidden',
    },
  },
  defaultVariants: {
    justify: 'start',
  },
});

type SceneRootVariants = typeof sceneRootVariants;

interface SceneRootProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<SceneRootVariants> {}

const SceneRoot = React.forwardRef<HTMLLIElement, SceneRootProps>(
  function SceneRoot({ justify, className, children }, ref) {
    return (
      <li ref={ref} className={cn(sceneRootVariants({ justify, className }))}>
        {children}
      </li>
    );
  }
);

export default SceneRoot;
