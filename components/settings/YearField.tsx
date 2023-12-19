import { useUpdateEffect } from '@/hooks';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { YearSelect } from '@/components/year';

import { type SettingsFormValues } from './SettingsForm';

function YearField() {
  const { control, watch, resetField } = useFormContext<SettingsFormValues>();

  const mode = watch('mode');

  const collectionKey = watch('collectionKey');

  const isDisabled = mode === 'preset';

  const isVisible =
    collectionKey === 'WEEKLY' ||
    collectionKey === 'MONTHLY' ||
    collectionKey === 'SEASONALLY';

  useUpdateEffect(() => {
    resetField('yearKey');
  }, [collectionKey]);

  return (
    <FormField
      name="yearKey"
      control={control}
      render={({ field }) => {
        return (
          <FormItem hidden={!isVisible}>
            <FormLabel>연도</FormLabel>
            <FormControl>
              <YearSelect
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

export default YearField;
