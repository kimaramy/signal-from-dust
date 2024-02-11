'use client';

import React, { useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/css';

import { useSceneContext, type SceneContextValue } from '../lib';

const sceneBodyVariants = cva(
  'relative grid h-full w-full list-none bg-fixed p-1',
  {
    variants: {
      view: {
        listitem: 'flex-1 rounded-md gap-1',
        screen: 'rounded-none gap-0.5',
      },
    },
    defaultVariants: {
      view: 'listitem',
    },
  }
);

interface SceneBodyProps extends VariantProps<typeof sceneBodyVariants> {
  columns?: number;
  className?: string;
  children: (context: SceneContextValue) => React.ReactNode;
}

const SceneBody = React.forwardRef<HTMLOListElement, SceneBodyProps>(
  function SceneBody(props, ref) {
    const { view = 'listitem', columns = 8, className, children } = props;

    const sceneContext = useSceneContext();

    const styleCSS = useMemo<React.CSSProperties>(
      () =>
        view === 'screen'
          ? {
              gridTemplateColumns: sceneContext.bits
                ?.map((bit) => (bit.value === '0' ? '1fr' : '1.5fr'))
                .join(' '),
              transform: `translateY(-3em) rotateX(70deg) rotateZ(40deg) translateZ(0em) scaleX(1.15) scaleY(0.9)`,
              transformStyle: 'preserve-3d',
            }
          : view === 'listitem'
          ? {
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }
          : {},
      [view, columns, sceneContext.bits]
    );

    return (
      <ol
        ref={ref}
        style={styleCSS}
        className={cn(sceneBodyVariants({ view, className }))}
      >
        {children(sceneContext)}
      </ol>
    );
  }
);

export default SceneBody;
