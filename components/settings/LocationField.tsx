import { useLocaleDictionary } from '@/lib/i18n';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import LocationSelect from '@/components/LocationSelect';

function LocationField() {
  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  return (
    <FormItem>
      <FormLabel>{settings.form.location.title}</FormLabel>
      <FormControl>
        <LocationSelect />
      </FormControl>
    </FormItem>
  );
}

export default LocationField;
