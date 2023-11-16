'use client';

import { DevTool } from '@hookform/devtools';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { type DataCollectionKey } from '@/components/dataCollection';
import { type DataNameKey } from '@/components/dataName';
import { type MonthKey } from '@/components/month';
import { type SeasonKey } from '@/components/season';
import { type YearKey } from '@/components/year';

import CustomSettingsFields from './CustomSettingsFields';
import ModeField from './ModeField';
import PresetFields from './PresetFields';
import SettingsFormResetButton from './SettingsFormResetButton';

const SETTINGS_FORM_ID = 'settings-form';

type SettingsMode = 'preset' | 'custom';

interface SettingsFormValues {
  mode: SettingsMode;
  dataNameKey: DataNameKey;
  dataCollectionKey: DataCollectionKey;
  yearKey: YearKey;
  seasonKey: SeasonKey;
  monthKey: MonthKey;
}

type SettingsFormSubmitHandler = SubmitHandler<SettingsFormValues>;

interface SettingsFormProps {
  defaultValues: SettingsFormValues;
  onSubmit: SettingsFormSubmitHandler;
  devTool?: boolean;
}

function SettingsForm({
  defaultValues,
  onSubmit,
  devTool = false,
}: SettingsFormProps) {
  const settingsForm = useForm<SettingsFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldUseNativeValidation: false,
    defaultValues,
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
          <div className="flex items-baseline justify-between gap-2">
            <ModeField />
            <SettingsFormResetButton />
          </div>
          <Separator className="my-2" />
          <PresetFields />
          <CustomSettingsFields />
        </form>
      </Form>

      {devTool && <DevTool control={settingsForm.control} />}
    </>
  );
}

export { SETTINGS_FORM_ID };

export type { SettingsMode, SettingsFormValues, SettingsFormSubmitHandler };

export default SettingsForm;
