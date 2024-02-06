import { useFormContext } from 'react-hook-form';

import { useLocaleDictionary } from '@/lib/i18n';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { SeasonSelect } from '@/components/season';

import { type SettingsFormValues } from './SettingsForm';

function SeasonField(props: React.HTMLAttributes<HTMLDivElement>) {
  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  const { control, watch } = useFormContext<SettingsFormValues>();

  const mode = watch('modeKey');

  const collectionKey = watch('collectionKey');

  const isDisabled = mode === 'preset';

  const isVisible = collectionKey === 'SEASONALLY';

  return (
    <FormField
      name="seasonKey"
      control={control}
      render={({ field }) => {
        return (
          <FormItem hidden={!isVisible} {...props}>
            <FormLabel>{settings.form.season.title}</FormLabel>
            <FormControl>
              <SeasonSelect
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

export default SeasonField;
