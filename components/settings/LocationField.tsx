import { useFormContext } from 'react-hook-form';

import { useLocaleDictionary } from '@/lib/i18n';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { LocationSelect } from '@/components/location';

import { SettingsFormValues } from './SettingsForm';

function LocationField() {
  const { control } = useFormContext<SettingsFormValues>();

  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  return (
    <FormField
      name="locationKey"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{settings.form.location.title}</FormLabel>
          <FormControl>
            <LocationSelect
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default LocationField;
