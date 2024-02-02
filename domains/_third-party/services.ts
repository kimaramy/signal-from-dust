/**
 * e.g. { GRADE: '나쁨', IDEX_MVL: '209', POLLUTANT: 'PM-2.5', NITROGEN: 0.028, OZONE: 0.037, CARBON: 0.7, SULFUROUS: 0.004, PM10: 83, PM25: 63 }
 */
export interface SeoulAirQualityData {
  GRADE: string;
  IDEX_MVL: string;
  POLLUTANT: string;
  NITROGEN: number;
  OZONE: number;
  CARBON: number;
  SULFUROUS: number;
  PM10: number;
  PM25: number;
}

export class SeoulAirQualityService {
  static serviceName = 'ListAvgOfSeoulAirQualityService';
  static async fetchDataset(fetchOptions?: Omit<RequestInit, 'method'>) {
    const serviceName = SeoulAirQualityService.serviceName;
    const serviceURL = `${process.env.NEXT_PUBLIC_SEOUL_OPENAPI_URL}/${process.env.NEXT_PUBLIC_SEOUL_OPENAPI_KEY}/json/${serviceName}/1/5/`;

    try {
      const response = await fetch(serviceURL, {
        method: 'GET',
        ...fetchOptions,
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const body = await response.json();
      const code = body[serviceName]['RESULT']['CODE'];
      const dataset = body[serviceName]['row'] as SeoulAirQualityData[];
      const isSuccess = code === 'INFO-000';
      if (!isSuccess) {
        throw new Error(`Request failed: ${JSON.stringify(code)}`);
      }
      return dataset;
    } catch (error) {
      // console.error(JSON.stringify(error, null, 2));
      throw new Error(
        error instanceof Error ? error.message : JSON.stringify(error, null, 2)
      );
    }
  }
}
