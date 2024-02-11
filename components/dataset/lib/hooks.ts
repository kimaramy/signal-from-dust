import { useContext } from 'react';

import { DatasetOrderContext, DatasetOrderContextError } from './contexts';

function useDatasetOrderContext() {
  const datasetOrderContext = useContext(DatasetOrderContext);
  if (!datasetOrderContext) {
    throw DatasetOrderContextError(useDatasetOrderContext.name);
  }
  return datasetOrderContext;
}

export { useDatasetOrderContext };
