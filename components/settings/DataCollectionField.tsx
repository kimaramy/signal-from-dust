import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { CollectionSelect } from '@/components/collection';

import type { SettingsFormData } from './SettingsForm';

function DataCollectionField() {
  const { control, watch } = useFormContext<SettingsFormData>();

  const mode = watch('mode');

  const isDisabled = mode === 'preset';

  return (
    <FormField
      name="dataCollection"
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>조회 유형</FormLabel>
            <FormControl>
              <CollectionSelect
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
