function composeSeoulAirQualityServiceEndpoint() {
  const serviceName = 'ListAvgOfSeoulAirQualityService';
  const dataType = 'json';
  const endpoint = `${process.env.SEOUL_OPENAPI_URL}/${process.env.SEOUL_OPENAPI_KEY}/${dataType}/${serviceName}/1/5/`;
  return {
    endpoint,
    serviceName,
  };
}

// export function fetchSeoulAirQualityDataset(options?: {
//   abortSignal?: AbortSignal;
// }) {
//   const { endpoint, serviceName } = composeSeoulAirQualityServiceEndpoint();

//   return new Promise<RealtimeData[]>((resolve, reject) => {
//     fetch(endpoint, { signal: options?.abortSignal })
//       .then((response) => response.json())
//       .then((body) => {
//         const isSuccess = body[serviceName]['RESULT']['CODE'] === 'INFO-000';
//         const dataset = body[serviceName]['row'] as RealtimeData[];
//         if (!isSuccess) {
//           throw new Error(JSON.stringify(body, null, 2));
//         }
//         return resolve(dataset);
//       })
//       .catch((err) => {
//         console.log(JSON.stringify(err, null, 2));
//         reject(err);
//       });
//   });
// }

export async function fetchRealtimeDataset() {
  const { serviceName } = composeSeoulAirQualityServiceEndpoint();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/seoulAirQuality`,
      {
        next: {
          revalidate: 3600,
          tags: [realtimeDatasetRevalidateTag],
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data'); // This will activate the closest `error.ts` Error Boundary
    }
    const body = await response.json();
    const isSuccess = body[serviceName]['RESULT']['CODE'] === 'INFO-000';
    const dataset = body[serviceName]['row'];
    if (!isSuccess) {
      throw new Error(JSON.stringify(body, null, 2)); // This will activate the closest `error.ts` Error Boundary
    }
    return dataset as RealtimeData[];
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

export const realtimeDatasetRevalidateTag = 'realtime';

export type RealtimeData = {
  PM10: number;
  PM25: number;
};
