import { useFormContext } from 'react-hook-form';

import { useLocaleDictionary } from '@/lib/i18n';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { DustSelect } from '@/components/dust';

import { type SettingsFormValues } from './SettingsForm';

function DustField() {
  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  const { control, watch } = useFormContext<SettingsFormValues>();

  const mode = watch('mode');

  const isDisabled = mode === 'preset';

  return (
    <FormField
      name="dustKey"
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{settings.form.dust.title}</FormLabel>
            <FormControl>
              <DustSelect
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

export default DustField;
