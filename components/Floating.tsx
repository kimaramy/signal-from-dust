import React from 'react';

import { cn } from '@/lib/utils';

interface FloatingProps extends React.HTMLAttributes<HTMLDivElement> {}

function Floating({ children, className, ...rest }: FloatingProps) {
  return (
    <div
      className={cn(
        'fixed z-50 flex items-center justify-center gap-2 rounded-md bg-white p-2 shadow-lg dark:bg-muted',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Floating;
