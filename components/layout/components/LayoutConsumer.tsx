'use client';

import type { ConsumerProps } from 'react';

import {
  LayoutContext,
  LayoutContextError,
  type LayoutContextValue,
} from '../lib/context';

function LayoutConsumer({ children }: ConsumerProps<LayoutContextValue>) {
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

export default LayoutConsumer;
