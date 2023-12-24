'use client';

import { useLocaleDictionary } from '@/lib/i18n';
import { usePlainUrlParam } from '@/lib/router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LocationSelectProps {}

function LocationSelect(_: LocationSelectProps) {
  const {
    locale,
    dictionary: { settings },
  } = useLocaleDictionary();

  const [location] = usePlainUrlParam('location', 'Seoul');

  return (
    <Select disabled value={location}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder={settings.form.location.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Seoul">
          {locale === 'ko' ? '서울' : 'Seoul'}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default LocationSelect;
