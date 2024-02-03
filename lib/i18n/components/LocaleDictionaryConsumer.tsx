'use client';

import type { ConsumerProps } from 'react';

import {
  LocaleDictionaryContext,
  LocaleDictionaryContextError,
  type LocaleDictionaryContextValue,
} from '../context';

function LocaleDictionaryConsumer({
  children,
}: ConsumerProps<LocaleDictionaryContextValue>) {
  return (
    <LocaleDictionaryContext.Consumer>
      {(localeDictionaryContext) => {
        if (!localeDictionaryContext) {
          throw LocaleDictionaryContextError(LocaleDictionaryConsumer.name);
        }
        return children(localeDictionaryContext);
      }}
    </LocaleDictionaryContext.Consumer>
  );
}

export default LocaleDictionaryConsumer;
