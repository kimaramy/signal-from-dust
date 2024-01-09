import React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/css';

export interface SafeAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const SafeArea = React.forwardRef<HTMLDivElement, SafeAreaProps>(
  function SafeArea({ className, asChild = false, ...props }, ref) {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp ref={ref} className={cn('3xl:container', className)} {...props} />
    );
  }
);

export { SafeArea };
