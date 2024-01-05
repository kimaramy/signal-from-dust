'use client';

import JsonToCsvButton, { getParserOptions } from './JsonToCsvButton';

interface DatasetDownloadButtonProps {
  dataset: object[];
  datasetKeys: ReadonlyArray<string>;
}

function DatasetDownloadButton({
  dataset,
  datasetKeys,
}: DatasetDownloadButtonProps) {
  const selectedFields = Object.keys(dataset[0]);
  return (
    <JsonToCsvButton
      json={dataset}
      fileName={`${datasetKeys.join('_')}.csv`}
      parserOptions={getParserOptions(selectedFields)}
      className="rounded-full"
    />
  );
}

export default DatasetDownloadButton;
