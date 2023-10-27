import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { DustSizeSelect } from '@/components/dustSize';

import type { SettingsFormData } from './SettingsForm';

function DataNameField() {
  const { control, watch } = useFormContext<SettingsFormData>();

  const mode = watch('mode');

  const isDisabled = mode === 'preset';

  return (
    <FormField
      name="dataName"
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>데이터</FormLabel>
            <FormControl>
              <DustSizeSelect
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

export default DataNameField;
