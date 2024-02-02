import {
  SeoulAirQualityService,
  type SeoulAirQualityData,
} from '../_third-party';

export type RealtimeData = SeoulAirQualityData; // make union with other third-party service data type

export type RealtimeDatasetService = 'SeoulAirQuality';

export const realtimeDatasetRevalidateTag = 'realtime';

export async function fetchRealtimeDataset(
  service: RealtimeDatasetService,
  fetchOptions?: Omit<RequestInit, 'method'>
) {
  const defaultFetchOptions = {
    cache: 'no-store', // disable cache
    next: {
      tags: [realtimeDatasetRevalidateTag], // to revalidate manually
    },
  } satisfies typeof fetchOptions;

  switch (service) {
    case 'SeoulAirQuality':
    default:
      return SeoulAirQualityService.fetchDataset({
        ...defaultFetchOptions,
        ...fetchOptions,
      });
  }
}

/**
 * @param origin
 * local or deployed(e.g. production) next.js server origin(\<scheme>://\<hostname>:\<port>)
 * - origin should be window.location.origin on client
 * - origin should be request origin which is parsed from header(Header API) on server
 * @returns fetched dataset(array) or empty array
 */
export async function fetchRealtimeDatasetViaRoute<TData = RealtimeData>(
  origin: string | null,
  routeFetchOptions?: Omit<RequestInit, 'method'>
) {
  if (origin === null) return [] as TData[];
  return new Promise<TData[]>((resolve, reject) => {
    fetch(`${origin}/api/realtime`, {
      method: 'GET',
      cache: 'no-store',
      ...routeFetchOptions,
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}
