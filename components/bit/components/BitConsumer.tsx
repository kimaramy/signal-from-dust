'use client';

import type { ConsumerProps } from 'react';

import { BitContext, BitContextError, type BitContextValue } from '../context';

function BitConsumer({ children }: ConsumerProps<BitContextValue>) {
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

export default BitConsumer;
