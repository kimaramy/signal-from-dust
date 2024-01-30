import { NextResponse } from 'next/server';
import { fetchRealtimeDataset } from '@/domains';

export async function GET(_request: Request) {
  try {
    const initialDataset = await fetchRealtimeDataset();
    return NextResponse.json(initialDataset, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
