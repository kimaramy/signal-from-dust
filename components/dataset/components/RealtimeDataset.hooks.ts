import { DustUtils, LocationUtils } from '@/lib/model';
import { useFilterQueryParamsEffect } from '@/lib/router';
import { useDustKey } from '@/components/dust';
import { useLocationKey } from '@/components/location';

export function useRealtimeDatasetParams() {
  const locationKey = useLocationKey('query');
  const dustKey = useDustKey('query');

  useFilterQueryParamsEffect({
    method: 'pick',
    names: [LocationUtils.schema.name, DustUtils.schema.name],
  });

  return { locationKey, dustKey };
}
