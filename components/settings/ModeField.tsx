import { useFormContext } from 'react-hook-form';

import { useLocaleDictionary } from '@/lib/i18n';
import { FormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { type SettingsFormValues } from './SettingsForm';

function ModeField() {
  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  const { control } = useFormContext<SettingsFormValues>();

  return (
    <FormField
      name="mode"
      control={control}
      render={({ field }) => {
        return (
          <RadioGroup
            className="flex gap-6 py-1"
            defaultValue={field.value}
            onValueChange={field.onChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="preset" id="r1" />
              <Label htmlFor="r1">{settings.form.preset_title}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="r2" />
              <Label htmlFor="r2">{settings.form.custom_title}</Label>
            </div>
          </RadioGroup>
        );
      }}
    />
  );
}

export default ModeField;
