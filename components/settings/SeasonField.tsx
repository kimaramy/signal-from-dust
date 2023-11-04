import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { SeasonSelect } from '@/components/season';

import { type SettingsFormValues } from './SettingsForm';

function SeasonField() {
  const { control, watch } = useFormContext<SettingsFormValues>();

  const mode = watch('mode');

  const dataCollectionKey = watch('dataCollectionKey');

  const isDisabled = mode === 'preset';

  const isVisible = dataCollectionKey === 'SEASONALLY';

  return (
    <FormField
      name="seasonKey"
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
