'use client';

import { useWatch } from 'react-hook-form';

import { cn } from '@/lib/css';

import DustField from './DustField';
import LocationField from './LocationField';
import type { SettingsFormValues } from './SettingsForm';

function RealtimeSettingsFields() {
  const { modeKey } = useWatch<SettingsFormValues>();

  const isHidden = modeKey !== 'realtime';

  return (
    <section className={cn('space-y-2 md:space-y-3', isHidden && 'hidden')}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
        <LocationField />
        <DustField />
      </div>
    </section>
  );
}

export default RealtimeSettingsFields;
