export async function fetchRealtimeDataset() {
  const serviceName = 'ListAvgOfSeoulAirQualityService';
  const response = await fetch(
    `http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_SEOUL_OPENAPI_TOKEN}/json/${serviceName}/1/5/`,
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
  // console.log(`data: %s`, JSON.stringify(body, null, 2));
  if (!isSuccess) {
    throw new Error(JSON.stringify(body, null, 2)); // This will activate the closest `error.ts` Error Boundary
  }
  return dataset as RealtimeData[];
}

export const realtimeDatasetRevalidateTag = 'realtime';

export type RealtimeData = {
  PM10: number;
  PM25: number;
};
