import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import type { SettingsFormData } from './SettingsForm';

function ModeField() {
  const { control } = useFormContext<SettingsFormData>();

  return (
    <FormField
      name="mode"
      control={control}
      render={({ field }) => {
        return (
          <RadioGroup
            className="flex gap-6"
            defaultValue={field.value}
            onValueChange={field.onChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="preset" id="r1" />
              <Label htmlFor="r1">미리설정</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="r2" />
              <Label htmlFor="r2">직접설정</Label>
            </div>
          </RadioGroup>
        );
      }}
    />
  );
}

export default ModeField;
