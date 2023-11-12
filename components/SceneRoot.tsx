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
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<SceneRootVariants> {}

const SceneRoot = React.forwardRef<HTMLDivElement, SceneRootProps>(
  function SceneRoot({ justify, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(sceneRootVariants({ justify, className }))}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default SceneRoot;
