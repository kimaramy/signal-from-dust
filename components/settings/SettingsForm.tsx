import { DevTool } from '@hookform/devtools';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Collection } from '@/components/collection';
import { DustSize } from '@/components/dustSize';
import { Month } from '@/components/month';
import { Season } from '@/components/season';
import { Year } from '@/components/year';

import DataCollectionField from './DataCollectionField';
import DataNameField from './DataNameField';
import LocationField from './LocationField';
import ModeField from './ModeField';
import MonthField from './MonthField';
import SeasonField from './SeasonField';
import YearField from './YearField';

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
          <section className="py-4">
            <ul className="grid grid-rows-5 gap-2">
              <li className="rounded-md bg-muted">1</li>
              <li className="rounded-md bg-muted">2</li>
            </ul>
          </section>
          <section className="py-4">
            <div className="flex justify-between gap-4">
              <LocationField />
              <DataNameField />
            </div>
            <div className="flex justify-between gap-4">
              <DataCollectionField />
            </div>
            <div className="flex justify-between gap-4">
              <SeasonField />
              <YearField />
              <MonthField />
            </div>
          </section>
        </form>
      </Form>

      <DevTool control={form.control} />
    </>
  );
}

export { SETTINGS_FORM_ID };

export type { SettingsFormData, SettingsFormSubmitHandler };

export default SettingsForm;
