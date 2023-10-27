import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { SeasonSelect } from '@/components/season';

import type { SettingsFormData } from './SettingsForm';

function SeasonField() {
  const { control, watch } = useFormContext<SettingsFormData>();

  const mode = watch('mode');

  const dataCollection = watch('dataCollection');

  const isDisabled = mode === 'preset';

  const isVisible = dataCollection === 'Seasonally';

  return (
    <FormField
      name="season"
      control={control}
      render={({ field }) => {
        return (
          <FormItem hidden={!isVisible}>
            <FormLabel>계절</FormLabel>
            <FormControl>
              <SeasonSelect
                value={field.value}
                disabled={isDisabled}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}

export default SeasonField;
