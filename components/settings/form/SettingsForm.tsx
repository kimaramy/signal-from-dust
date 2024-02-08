'use client';

import { DevTool } from '@hookform/devtools';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

import { SettingsContextValues } from '../context';
import CustomSettingsFields from './CustomSettingsFields';
import ModeField from './ModeField';
import PresetFields from './PresetFields';
import RealtimeSettingsFields from './RealtimeSettingsFields';

// import SettingsFormResetButton from './SettingsFormResetButton';

const SETTINGS_FORM_ID = 'settings-form';

type SettingsFormValues = Required<SettingsContextValues>;

type SettingsFormSubmitHandler = SubmitHandler<SettingsFormValues>;

interface SettingsFormProps {
  values: SettingsFormValues;
  onSubmit: SettingsFormSubmitHandler;
  useDevTool?: boolean;
}

function SettingsForm({
  values,
  onSubmit,
  useDevTool = false,
}: SettingsFormProps) {
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
          className="space-y-4 py-4"
          noValidate
          autoComplete="off"
          onSubmit={settingsForm.handleSubmit(onSubmit)}
        >
          <div className="flex justify-between gap-2">
            <ModeField />
            {/* <SettingsFormResetButton /> */}
          </div>
          <Separator />
          <PresetFields />
          <CustomSettingsFields />
          <RealtimeSettingsFields />
        </form>
      </Form>

      {useDevTool && <DevTool control={settingsForm.control} />}
    </>
  );
}

export { SETTINGS_FORM_ID };

export type { SettingsFormValues, SettingsFormSubmitHandler };

export default SettingsForm;
