import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

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

type Position = string | number;

interface FloatingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof floatingVariants> {
  top?: Position;
  bottom?: Position;
  left?: Position;
  right?: Position;
}

const Floating = React.forwardRef<HTMLDivElement, FloatingProps>(
  function Floating(props, ref) {
    const {
      direction,
      top,
      bottom,
      left,
      right,
      children,
      className,
      ...rest
    } = props;

    return (
      <div
        ref={ref}
        className={cn(floatingVariants({ direction, className }))}
        style={{
          top: typeof top === 'number' ? `${top}%` : top,
          bottom: typeof bottom === 'number' ? `${bottom}%` : bottom,
          left: typeof left === 'number' ? `${left}%` : left,
          right: typeof right === 'number' ? `${right}%` : right,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Floating;
