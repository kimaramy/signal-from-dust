// import { DevTool } from '@hookform/devtools';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Collection } from '@/components/collection';
import { DustSize } from '@/components/dustSize';
import { Month } from '@/components/month';
import { Season } from '@/components/season';
import { Year } from '@/components/year';

import CustomSettingsFields from './CustomSettingsFields';
import ModeField from './ModeField';
import PresetFields from './PresetFields';

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
  defaultValues: SettingsFormData;
  onSubmit: SettingsFormSubmitHandler;
}

function SettingsForm(props: SettingsFormProps) {
  const { defaultValues, values, onSubmit } = props;

  const settingsForm = useForm<SettingsFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldUseNativeValidation: false,
    values,
  });

  return (
    <>
      <Form {...settingsForm}>
        <form
          id={SETTINGS_FORM_ID}
          className="space-y-6 py-4"
          noValidate
          autoComplete="off"
          onSubmit={settingsForm.handleSubmit(onSubmit)}
        >
          <ModeField />
          <Separator className="my-2" />
          <PresetFields defaultValues={defaultValues} />
          <CustomSettingsFields />
        </form>
      </Form>

      {/* <DevTool control={settingsForm.control} /> */}
    </>
  );
}

export { SETTINGS_FORM_ID };

export type { SettingsFormData, SettingsFormSubmitHandler };

export default SettingsForm;
