import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { DataNameSelect } from '@/components/dataName';

import { type SettingsFormValues } from './SettingsForm';

function DataNameField() {
  const { control, watch } = useFormContext<SettingsFormValues>();

  const mode = watch('mode');

  const isDisabled = mode === 'preset';

  return (
    <FormField
      name="dataNameKey"
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>데이터</FormLabel>
            <FormControl>
              <DataNameSelect
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
