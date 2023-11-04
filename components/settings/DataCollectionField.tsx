import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { DataCollectionSelect } from '@/components/dataCollection';

import { type SettingsFormValues } from './SettingsForm';

function DataCollectionField() {
  const { control, watch } = useFormContext<SettingsFormValues>();

  const mode = watch('mode');

  const isDisabled = mode === 'preset';

  return (
    <FormField
      name="dataCollectionKey"
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>조회 유형</FormLabel>
            <FormControl>
              <DataCollectionSelect
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

export default DataCollectionField;
