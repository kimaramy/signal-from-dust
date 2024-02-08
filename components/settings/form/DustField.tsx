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

function DustField(props: React.HTMLAttributes<HTMLDivElement>) {
  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  const { control, watch } = useFormContext<SettingsFormValues>();

  const modeKey = watch('modeKey');

  const isDisabled = modeKey === 'preset';

  return (
    <FormField
      name="dustKey"
      control={control}
      render={({ field }) => {
        return (
          <FormItem {...props}>
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
