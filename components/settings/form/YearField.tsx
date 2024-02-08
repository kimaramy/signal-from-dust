import { useFormContext } from 'react-hook-form';

import { useUpdateEffect } from '@/lib/hooks';
import { useLocaleDictionary } from '@/lib/i18n';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { YearSelect } from '@/components/year';

import { type SettingsFormValues } from './SettingsForm';

function YearField(props: React.HTMLAttributes<HTMLDivElement>) {
  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  const { control, watch, resetField } = useFormContext<SettingsFormValues>();

  const modeKey = watch('modeKey');

  const collectionKey = watch('collectionKey');

  const isDisabled = modeKey === 'preset';

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
          <FormItem hidden={!isVisible} {...props}>
            <FormLabel>{settings.form.year.title}</FormLabel>
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
