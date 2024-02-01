/**
 * @param origin
 * local or deployed next.js server origin(\<scheme>://\<hostname>:\<port>)
 * - origin should be window.location.origin on client
 * - origin should be request origin which is parsed from header(Header API) on server
 * @returns fetched dataset(array) or empty array
 */
export async function fetchRealtimeDatasetViaRoute<TData = RealtimeData>(
  origin: string | null,
  fetchOptions?: Omit<RequestInit, 'method' | 'cache'>
) {
  if (origin === null) return [] as TData[];
  return new Promise<TData[]>((resolve, reject) => {
    fetch(`${origin}/api/realtime`, {
      method: 'GET',
      cache: 'no-cache',
      ...fetchOptions,
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

export function fetchRealtimeDataset(
  fetchOptions?: Omit<RequestInit, 'method' | 'cache'>
) {
  const serviceName = 'ListAvgOfSeoulAirQualityService';
  const serviceURL = `${process.env.NEXT_PUBLIC_SEOUL_OPENAPI_URL}/${process.env.NEXT_PUBLIC_SEOUL_OPENAPI_KEY}/json/${serviceName}/1/5/`;

  return new Promise<RealtimeData[]>((resolve, reject) => {
    fetch(serviceURL, {
      method: 'GET',
      cache: 'no-store', // disable cache
      next: {
        // revalidate: 60 * 30, // revalidate not requiered if no cache
        tags: [realtimeDatasetRevalidateTag],
      },
      ...fetchOptions,
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
