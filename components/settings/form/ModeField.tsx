import { useFormContext } from 'react-hook-form';

import { DesktopOnly } from '@/lib/device';
import { useLocaleDictionary } from '@/lib/i18n';
import { FormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { SettingsModeUtils } from '../schema';
import { type SettingsFormValues } from './SettingsForm';

function ModeRadio({
  value,
  label,
}: {
  value: SettingsModeUtils.Key;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <RadioGroupItem id={value} value={value} />
      <Label htmlFor={value} className="cursor-pointer">
        {label}
      </Label>
    </div>
  );
}

function ModeField() {
  const { locale } = useLocaleDictionary();

  const { control } = useFormContext<SettingsFormValues>();

  return (
    <FormField
      name="modeKey"
      control={control}
      render={({ field }) => {
        return (
          <RadioGroup
            className="flex gap-6 py-1"
            defaultValue={field.value}
            onValueChange={field.onChange}
          >
            {SettingsModeUtils.schema
              .getAllKeys()
              .toSorted(
                (a, b) =>
                  SettingsModeUtils.schema.getValue(a).order -
                  SettingsModeUtils.schema.getValue(b).order
              )
              .map((modeKey) => {
                const isDesktopOnly =
                  SettingsModeUtils.schema.checkDesktopOnly(modeKey);

                const label = SettingsModeUtils.schema.display(modeKey, locale);

                if (isDesktopOnly) {
                  return (
                    <DesktopOnly key={modeKey}>
                      <ModeRadio value={modeKey} label={label} />
                    </DesktopOnly>
                  );
                }
                return (
                  <ModeRadio key={modeKey} value={modeKey} label={label} />
                );
              })}
          </RadioGroup>
        );
      }}
    />
  );
}

export default ModeField;
