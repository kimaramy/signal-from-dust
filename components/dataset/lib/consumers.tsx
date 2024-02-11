'use client';

import type { BaseConsumerProps } from '@/lib/react-types';

import {
  DatasetOrderContext,
  DatasetOrderContextError,
  type DatasetOrderContextValue,
} from './contexts';

function DatasetOrderConsumer({
  children,
}: BaseConsumerProps<DatasetOrderContextValue>) {
  return (
    <DatasetOrderContext.Consumer>
      {(datasetOrderContext) => {
        if (!datasetOrderContext) {
          throw DatasetOrderContextError(DatasetOrderConsumer.name);
        }
        return children(datasetOrderContext);
      }}
    </DatasetOrderContext.Consumer>
  );
}

export { DatasetOrderConsumer };
