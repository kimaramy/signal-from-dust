'use client';

import { useWatch } from 'react-hook-form';

import { cn } from '@/lib/css';

import DustField from './DustField';
import LocationField from './LocationField';
import type { SettingsFormValues } from './SettingsForm';

function RealtimeSettingsFields() {
  const { mode } = useWatch<SettingsFormValues>();

  const isHidden = mode !== 'realtime';

  return (
    <section className={cn('space-y-3', isHidden && 'hidden')}>
      <div className="flex justify-between gap-2">
        <LocationField />
        <DustField />
      </div>
    </section>
  );
}

export default RealtimeSettingsFields;
