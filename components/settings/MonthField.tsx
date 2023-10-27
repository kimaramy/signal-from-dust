import { useUpdateEffect } from '@/hooks';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { defaultMonthValue, MonthSelect } from '@/components/month';

import type { SettingsFormData } from './SettingsForm';

function MonthField() {
  const { control, watch, setValue } = useFormContext<SettingsFormData>();

  const mode = watch('mode');

  const dataCollection = watch('dataCollection');

  const isDisabled = mode === 'preset';

  const isVisible =
    dataCollection === 'Daily' || dataCollection === 'Weekdaily';

  useUpdateEffect(() => {
    setValue('month', defaultMonthValue);
  }, [dataCollection]);

  return (
    <FormField
      name="month"
      control={control}
      render={({ field }) => {
        return (
          <FormItem hidden={!isVisible}>
            <FormLabel>월</FormLabel>
            <FormControl>
              <MonthSelect
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

export default MonthField;
