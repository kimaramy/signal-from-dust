export function fetchRealtimeDataset(options?: { signal?: AbortSignal }) {
  const serviceName = 'ListAvgOfSeoulAirQualityService';
  const serviceURL = `${process.env.NEXT_PUBLIC_SEOUL_OPENAPI_URL}/${process.env.NEXT_PUBLIC_SEOUL_OPENAPI_KEY}/json/${serviceName}/1/5/`;

  return new Promise<RealtimeData[]>((resolve, reject) => {
    fetch(serviceURL, {
      signal: options?.signal,
      next: {
        revalidate: 60 * 30, // every 30 minutes
        tags: [realtimeDatasetRevalidateTag],
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
      })
      .then((body) => {
        const isSuccess = body[serviceName]['RESULT']['CODE'] === 'INFO-000';
        const dataset = body[serviceName]['row'] as RealtimeData[];
        if (!isSuccess) throw new Error(JSON.stringify(body, null, 2));
        return resolve(dataset);
      })
      .catch((error) => {
        console.log(JSON.stringify(error, null, 2));
        reject(error); // This rejection should activate the closest `error.tsx` Error Boundary
      });
  });
}

export const realtimeDatasetRevalidateTag = 'realtime';

export type RealtimeData = {
  PM10: number;
  PM25: number;
};
