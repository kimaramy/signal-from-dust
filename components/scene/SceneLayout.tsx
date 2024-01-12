import React from 'react';

import { cn } from '@/lib/css';

interface SceneLayoutProps {
  bits: string[];
  columns: number;
  className?: string;
  children: (bits: string[]) => React.ReactNode;
}

const SceneLayout = React.forwardRef<HTMLUListElement, SceneLayoutProps>(
  function SceneLayout({ bits, columns, className, children }, ref) {
    return (
      <ul
        ref={ref}
        className={cn(
          'relative grid h-full w-full flex-1 cursor-pointer gap-1 rounded-md bg-fixed p-1 peer-hover:ring-1',
          className
        )}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {children(bits)}
      </ul>
    );
  }
);

export default SceneLayout;
