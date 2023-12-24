import { useFormContext } from 'react-hook-form';

import { useUpdateEffect } from '@/lib/hooks';
import { useLocaleDictionary } from '@/lib/i18n';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { MonthSelect } from '@/components/month';

import { type SettingsFormValues } from './SettingsForm';

function MonthField() {
  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  const { control, watch, resetField } = useFormContext<SettingsFormValues>();

  const mode = watch('mode');

  const collectionKey = watch('collectionKey');

  const isDisabled = mode === 'preset';

  const isVisible = collectionKey === 'DAILY' || collectionKey === 'WEEKDAILY';

  useUpdateEffect(() => {
    resetField('monthKey');
  }, [collectionKey]);

  return (
    <FormField
      name="monthKey"
      control={control}
      render={({ field }) => {
        return (
          <FormItem hidden={!isVisible}>
            <FormLabel>{settings.form.month.title}</FormLabel>
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
