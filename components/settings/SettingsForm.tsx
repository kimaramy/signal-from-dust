import { DevTool } from '@hookform/devtools';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Collection } from '@/components/collection';
import { DustSize } from '@/components/dustSize';
import { Month } from '@/components/month';
import { Season } from '@/components/season';
import { Year } from '@/components/year';

import CustomSettingsFields from './CustomSettingsFields';
import ModeField from './ModeField';
import PresetSettingsFields from './PresetSettingsFields';

const SETTINGS_FORM_ID = 'settings-form';

interface SettingsFormData {
  mode: 'preset' | 'custom';
  dataName: DustSize;
  dataCollection: Collection;
  year: Year;
  month: Month;
  season: Season;
}

type SettingsFormSubmitHandler = SubmitHandler<SettingsFormData>;

interface SettingsFormProps {
  values: SettingsFormData;
  onSubmit: SettingsFormSubmitHandler;
}

function SettingsForm({ values, onSubmit }: SettingsFormProps) {
  const form = useForm<SettingsFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldUseNativeValidation: false,
    values,
  });

  return (
    <>
      <Form {...form}>
        <form
          id={SETTINGS_FORM_ID}
          className="space-y-4 py-4"
          noValidate
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ModeField />
          <PresetSettingsFields />
          <CustomSettingsFields />
        </form>
      </Form>

      <DevTool control={form.control} />
    </>
  );
}

export { SETTINGS_FORM_ID };

export type { SettingsFormData, SettingsFormSubmitHandler };

export default SettingsForm;
