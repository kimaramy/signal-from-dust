import { useFormContext } from 'react-hook-form';

import { useLocaleDictionary } from '@/lib/i18n';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { CollectionSelect } from '@/components/collection';

import { type SettingsFormValues } from '../form/SettingsForm';

function CollectionField() {
  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  const { control, watch } = useFormContext<SettingsFormValues>();

  const mode = watch('mode');

  const isDisabled = mode === 'preset';

  return (
    <FormField
      name="collectionKey"
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
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
