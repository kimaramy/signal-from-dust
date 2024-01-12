import React from 'react';

import { cn } from '@/lib/css';

export interface SceneRootProps extends React.HTMLAttributes<HTMLDivElement> {}

const SceneRoot = React.forwardRef<HTMLDivElement, SceneRootProps>(
  function SceneRoot({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn('relative flex h-full items-center gap-6', className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default SceneRoot;
