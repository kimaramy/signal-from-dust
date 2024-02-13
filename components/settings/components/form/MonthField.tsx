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

function MonthField(props: React.ComponentPropsWithoutRef<'div'>) {
  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  const { control, watch, resetField } = useFormContext<SettingsFormValues>();

  const modeKey = watch('modeKey');

  const collectionKey = watch('collectionKey');

  const isDisabled = modeKey === 'preset';

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
          <FormItem hidden={!isVisible} {...props}>
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
