import { useUpdateEffect } from '@/hooks';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { defaultMonthValue, MonthSelect } from '@/components/month';

import { type SettingsFormValues } from './SettingsForm';

function MonthField() {
  const { control, watch, setValue } = useFormContext<SettingsFormValues>();

  const mode = watch('mode');

  const dataCollectionKey = watch('dataCollectionKey');

  const isDisabled = mode === 'preset';

  const isVisible =
    dataCollectionKey === 'DAILY' || dataCollectionKey === 'WEEKDAILY';

  useUpdateEffect(() => {
    setValue('month', defaultMonthValue);
  }, [dataCollectionKey]);

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
