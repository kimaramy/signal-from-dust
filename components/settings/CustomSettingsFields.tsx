import { useWatch } from 'react-hook-form';

import DataCollectionField from './DataCollectionField';
import DataNameField from './DataNameField';
import LocationField from './LocationField';
import MonthField from './MonthField';
import SeasonField from './SeasonField';
import type { SettingsFormData } from './SettingsForm';
import YearField from './YearField';

function CustomSettingsFields() {
  const { mode } = useWatch<SettingsFormData>();

  const isVisible = mode === 'custom';

  if (!isVisible) return null;

  return (
    <section className="space-y-4">
      <div className="flex justify-between gap-2">
        <LocationField />
        <DataNameField />
      </div>
      <div className="flex justify-between gap-2">
        <DataCollectionField />
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
