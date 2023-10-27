import { useUpdateEffect } from '@/hooks';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { defaultYearValue, YearSelect } from '@/components/year';

import type { SettingsFormData } from './SettingsForm';

function YearField() {
  const { control, watch, setValue } = useFormContext<SettingsFormData>();

  const mode = watch('mode');

  const dataCollection = watch('dataCollection');

  const isDisabled = mode === 'preset';

  const isVisible =
    dataCollection === 'Weekly' ||
    dataCollection === 'Monthly' ||
    dataCollection === 'Seasonally';

  useUpdateEffect(() => {
    setValue('year', defaultYearValue);
  }, [dataCollection]);

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
