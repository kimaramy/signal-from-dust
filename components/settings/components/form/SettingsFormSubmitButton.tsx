import { Button } from '@/components/ui/button';

import { SETTINGS_FORM_ID } from './SettingsForm';

interface SettingsFormSubmitButtonProps {
  label: string;
}

function SettingsFormSubmitButton({ label }: SettingsFormSubmitButtonProps) {
  return (
    <Button
      form={SETTINGS_FORM_ID}
      type="submit"
      variant="default"
      size="lg"
      className="w-full"
    >
      {label}
    </Button>
  );
}

export default SettingsFormSubmitButton;
