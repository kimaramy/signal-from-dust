import { Button } from '@/components/ui/button';

import { SETTINGS_FORM_ID } from './SettingsForm';

function SettingsFormSubmitButton() {
  return (
    <Button
      type="submit"
      form={SETTINGS_FORM_ID}
      variant="default"
      size="lg"
      className="w-full"
    >
      적용
    </Button>
  );
}

export default SettingsFormSubmitButton;
