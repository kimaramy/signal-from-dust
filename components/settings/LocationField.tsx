import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import LocationSelect from '@/components/LocationSelect';

function LocationField() {
  return (
    <FormItem>
      <FormLabel>위치</FormLabel>
      <FormControl>
        <LocationSelect />
      </FormControl>
    </FormItem>
  );
}

export default LocationField;
