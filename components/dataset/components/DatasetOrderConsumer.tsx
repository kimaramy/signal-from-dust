'use client';

import type { ConsumerProps } from 'react';

import {
  DatasetOrderContext,
  DatasetOrderContextError,
  type DatasetOrderContextValue,
} from '../context';

function DatasetOrderConsumer({
  children,
}: ConsumerProps<DatasetOrderContextValue>) {
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

export default DatasetOrderConsumer;
