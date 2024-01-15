'use client';

import React from 'react';

import { cn } from '@/lib/css';

import { useSceneContext } from '../hooks';

interface StackSceneBodyProps {
  className?: string;
  children: (control: { bits: string[] }) => React.ReactNode;
}

const StackSceneBody = React.forwardRef<HTMLUListElement, StackSceneBodyProps>(
  function StackSceneBody({ className, children }, ref) {
    const { bits } = useSceneContext();
    return (
      <ul
        ref={ref}
        style={{
          gridTemplateColumns: bits
            ?.map((bit) => (bit === '0' ? '1fr' : '1.5fr'))
            .join(' '),
          transform: `rotateX(70deg) rotateZ(40deg) translateZ(0em) scaleX(1.15) scaleY(1.35)`,
          transformStyle: 'preserve-3d',
        }}
        className={cn(
          'relative grid h-full w-full flex-1 cursor-pointer gap-1 rounded-md bg-fixed p-1',
          className
        )}
      >
        {children({ bits })}
      </ul>
    );
  }
);

export default StackSceneBody;
