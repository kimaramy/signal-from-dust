'use client';

import type { BaseConsumerProps } from '@/lib/react-types';

import {
  LayoutContext,
  LayoutContextError,
  type LayoutContextValue,
} from './contexts';

function LayoutConsumer({ children }: BaseConsumerProps<LayoutContextValue>) {
  return (
    <LayoutContext.Consumer>
      {(layoutContext) => {
        if (!layoutContext) {
          throw LayoutContextError(LayoutConsumer.name);
        }
        return children(layoutContext);
      }}
    </LayoutContext.Consumer>
  );
}

export { LayoutConsumer };
