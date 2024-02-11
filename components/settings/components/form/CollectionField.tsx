import { useFormContext } from 'react-hook-form';

import { useLocaleDictionary } from '@/lib/i18n';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { CollectionSelect } from '@/components/collection';

import type { SettingsFormValues } from './SettingsForm';

function CollectionField(props: React.HTMLAttributes<HTMLDivElement>) {
  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  const { control, watch } = useFormContext<SettingsFormValues>();

  const modeKey = watch('modeKey');

  const isDisabled = modeKey === 'preset';

  return (
    <FormField
      name="collectionKey"
      control={control}
      render={({ field }) => {
        return (
          <FormItem {...props}>
            <FormLabel>{settings.form.collection.title}</FormLabel>
            <FormControl>
              <CollectionSelect
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

export default CollectionField;
