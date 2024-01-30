export async function fetchRealtimeDataset() {
  const service = 'ListAvgOfSeoulAirQualityService';
  const endpoint = `${process.env.NEXT_PUBLIC_SEOUL_OPENAPI_ORIGIN}/${process.env.NEXT_PUBLIC_SEOUL_OPENAPI_TOKEN}/json/${service}/1/5/`;
  try {
    const response = await fetch(endpoint, {
      mode: 'no-cors',
      next: {
        revalidate: 3600,
        tags: [realtimeDatasetRevalidateTag],
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data'); // This will activate the closest `error.ts` Error Boundary
    }
    // console.log(JSON.stringify(response.url, null, 2));
    const body = await response.json();
    const isSuccess = body[service]['RESULT']['CODE'] === 'INFO-000';
    const dataset = body[service]['row'];
    // console.log(`data: %s`, JSON.stringify(body, null, 2));
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
