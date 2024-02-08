'use client';

import { useWatch } from 'react-hook-form';

import { cn } from '@/lib/css';

import CollectionField from './CollectionField';
import DustField from './DustField';
import LocationField from './LocationField';
import MonthField from './MonthField';
import SeasonField from './SeasonField';
import type { SettingsFormValues } from './SettingsForm';
import YearField from './YearField';

function CustomSettingsFields() {
  const { modeKey } = useWatch<SettingsFormValues>();

  const isHidden = modeKey !== 'custom';

  return (
    <section className={cn('space-y-2 md:space-y-3', isHidden && 'hidden')}>
      <div className="flex flex-wrap gap-2 sm:flex-nowrap md:gap-4">
        <LocationField className="w-1/2 flex-1 sm:flex-initial" />
        <DustField className="w-1/2 flex-1 sm:flex-initial" />
      </div>
      <div className="flex flex-wrap gap-2 sm:flex-nowrap md:gap-4">
        <CollectionField className="w-1/2 flex-1 sm:flex-initial" />
      </div>
      <div className="flex flex-wrap gap-2 sm:flex-nowrap md:gap-4">
        <SeasonField className="w-1/2 flex-1 sm:flex-initial" />
        <YearField className="w-1/2 flex-1 sm:flex-initial" />
        <MonthField className="w-1/2 flex-1 sm:flex-initial" />
      </div>
    </section>
  );
}

export default CustomSettingsFields;
