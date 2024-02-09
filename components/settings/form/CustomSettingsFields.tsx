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
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
        <LocationField />
        <DustField />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
        <CollectionField />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
        <SeasonField />
        <YearField />
        <MonthField />
      </div>
    </section>
  );
}

export default CustomSettingsFields;
