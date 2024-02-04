import { useFormContext } from 'react-hook-form';

import { DesktopOnly } from '@/lib/device';
import { useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
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
            <div className="flex items-center gap-2">
              <RadioGroupItem value="preset" id="r1" />
              <Label htmlFor="r1" className="cursor-pointer">
                {settings.form.preset_title}
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="custom" id="r2" />
              <Label htmlFor="r2" className="cursor-pointer">
                {settings.form.custom_title}
              </Label>
            </div>
            <DesktopOnly>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="realtime" id="r3" />
                <div className="flex items-center gap-1">
                  <Label htmlFor="r3" className="cursor-pointer">
                    {settings.form.realtime_title}
                  </Label>
                  <div className="rounded-full bg-accent p-1">
                    <Icon.FlaskConical
                      aria-hidden
                      className="h-3.5 w-3.5 text-accent-foreground"
                    />
                  </div>
                </div>
              </div>
            </DesktopOnly>
          </RadioGroup>
        );
      }}
    />
  );
}

export default ModeField;
