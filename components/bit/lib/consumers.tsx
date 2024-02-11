'use client';

import type { BaseConsumerProps } from '@/lib/react-types';

import { BitContext, BitContextError, type BitContextValue } from './contexts';

function BitConsumer({ children }: BaseConsumerProps<BitContextValue>) {
  return (
    <BitContext.Consumer>
      {(bitContext) => {
        if (!bitContext) {
          throw BitContextError(BitConsumer.name);
        }
        return children(bitContext);
      }}
    </BitContext.Consumer>
  );
}

export { BitConsumer };
