import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

interface FloatingProps extends React.HTMLAttributes<HTMLDivElement> {}

const floatingVariants = cva(
  'fixed z-50 flex items-center justify-center gap-2 rounded-md bg-white p-2 shadow-lg dark:bg-muted',
  {
    variants: {
      direction: {
        row: 'flex-row',
        column: 'flex-col',
      },
    },
    defaultVariants: {
      direction: 'row',
    },
  }
);

interface FloatingProps extends VariantProps<typeof floatingVariants> {}

const Floating = React.forwardRef<HTMLDivElement, FloatingProps>(
  function Floating({ direction, children, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(floatingVariants({ direction, className }))}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Floating;
