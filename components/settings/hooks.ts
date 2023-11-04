import { useMemo } from 'react';

import { dataCollectionSchema } from '@/components/dataCollection';
import { dataNameSchema } from '@/components/dataName';
import { monthSchema } from '@/components/month';
import { seasonSchema } from '@/components/season';
import { yearSchema } from '@/components/year';

import { type SettingsFormValues } from './SettingsForm';

function useSettingsFormDefaultValues() {
  return useMemo<SettingsFormValues>(
    () => ({
      mode: 'preset',
      dataNameKey: dataNameSchema.getDefaultKey(),
      dataCollectionKey: dataCollectionSchema.getDefaultKey(),
      yearKey: yearSchema.getDefaultKey(),
      seasonKey: seasonSchema.getDefaultKey(),
      monthKey: monthSchema.getDefaultKey(),
    }),
    []
  );
}

export { useSettingsFormDefaultValues };
