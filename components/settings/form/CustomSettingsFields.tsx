'use client';

import { useWatch } from 'react-hook-form';

import { cn } from '@/lib/css';

import CollectionField from './CollectionField';
import DataNameField from './DataNameField';
import LocationField from './LocationField';
import MonthField from './MonthField';
import SeasonField from './SeasonField';
import { type SettingsFormValues } from './SettingsForm';
import YearField from './YearField';

function CustomSettingsFields() {
  const { mode } = useWatch<SettingsFormValues>();

  const isHidden = mode !== 'custom';

  return (
    <section className={cn('space-y-4', isHidden && 'hidden')}>
      <div className="flex justify-between gap-2">
        <LocationField />
        <DataNameField />
      </div>
      <div className="flex justify-between gap-2">
        <CollectionField />
      </div>
      <div className="flex justify-between gap-2">
        <SeasonField />
        <YearField />
        <MonthField />
      </div>
    </section>
  );
}

export default CustomSettingsFields;
