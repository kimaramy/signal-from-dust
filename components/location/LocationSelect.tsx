'use client';

import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { LocationUtils } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LocationSelectProps {
  value: LocationUtils.Key;
  onValueChange: (value: LocationUtils.Key) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function LocationSelect(props: LocationSelectProps) {
  const { value, onValueChange, hidden = false, disabled, className } = props;

  const {
    locale,
    dictionary: { settings },
  } = useLocaleDictionary();

  const locationKeys = LocationUtils.schema.getAllKeys();

  return (
    <Select
      value={value}
      disabled={disabled ?? locationKeys.length < 2}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder={settings.form.location.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {locationKeys.map((locationKey) => (
          <SelectItem key={locationKey} value={locationKey}>
            {LocationUtils.schema.display(locationKey, locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LocationSelect;
