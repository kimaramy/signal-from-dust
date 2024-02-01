import { NextResponse } from 'next/server';

// import { fetchRealtimeDataset } from '@/domains';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request) {
  try {
    const initialDataset = await Promise.resolve([
      {
        GRADE: '나쁨',
        IDEX_MVL: '209',
        POLLUTANT: 'PM-2.5',
        NITROGEN: 0.028,
        OZONE: 0.037,
        CARBON: 0.7,
        SULFUROUS: 0.004,
        PM10: 83,
        PM25: 63,
      },
    ]);
    return NextResponse.json(initialDataset, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
