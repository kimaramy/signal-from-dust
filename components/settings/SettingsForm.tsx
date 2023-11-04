// import { DevTool } from '@hookform/devtools';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { type DataCollectionKey } from '@/components/dataCollection';
import { type DataNameKey } from '@/components/dataName';
import { type Month } from '@/components/month';
import { type SeasonKey } from '@/components/season';
import { type Year } from '@/components/year';

import CustomSettingsFields from './CustomSettingsFields';
import ModeField from './ModeField';
import PresetFields from './PresetFields';

const SETTINGS_FORM_ID = 'settings-form';

interface SettingsFormValues {
  mode: 'preset' | 'custom';
  dataNameKey: DataNameKey;
  dataCollectionKey: DataCollectionKey;
  seasonKey: SeasonKey;
  month: Month;
  year: Year;
}

type SettingsFormSubmitHandler = SubmitHandler<SettingsFormValues>;

interface SettingsFormProps {
  values: SettingsFormValues;
  defaultValues: SettingsFormValues;
  onSubmit: SettingsFormSubmitHandler;
}

function SettingsForm(props: SettingsFormProps) {
  const { defaultValues, values, onSubmit } = props;

  const settingsForm = useForm<SettingsFormValues>({
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

export type { SettingsFormValues, SettingsFormSubmitHandler };

export default SettingsForm;
