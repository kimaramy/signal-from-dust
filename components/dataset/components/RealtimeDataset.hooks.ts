import { useDustKey } from '@/components/dust';
import { useLocationKey } from '@/components/location';

export function useRealtimeDatasetParams() {
  const locationKey = useLocationKey('query');
  const dustKey = useDustKey('query');
  return { locationKey, dustKey };
}
