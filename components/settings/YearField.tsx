import { useUpdateEffect } from '@/hooks';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { defaultYearValue, YearSelect } from '@/components/year';

import { type SettingsFormValues } from './SettingsForm';

function YearField() {
  const { control, watch, setValue } = useFormContext<SettingsFormValues>();

  const mode = watch('mode');

  const dataCollectionKey = watch('dataCollectionKey');

  const isDisabled = mode === 'preset';

  const isVisible =
    dataCollectionKey === 'WEEKLY' ||
    dataCollectionKey === 'MONTHLY' ||
    dataCollectionKey === 'SEASONALLY';

  useUpdateEffect(() => {
    setValue('year', defaultYearValue);
  }, [dataCollectionKey]);

  return (
    <FormField
      name="year"
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
