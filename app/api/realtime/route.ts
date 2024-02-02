import { NextResponse } from 'next/server';
import { fetchRealtimeDataset } from '@/domains';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request) {
  try {
    /**
     * If other realtime service is ready, switch services with its conditions that from parsed request.
     */
    const initialDataset = await fetchRealtimeDataset('SeoulAirQuality');
    return NextResponse.json(initialDataset, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
