'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { FormField } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  dataCollectionSchema,
  type DataCollectionKey,
} from '@/components/dataCollection';
import { dataNameSchema } from '@/components/dataName';

import { type SettingsFormValues } from './SettingsForm';

/**
 * 데이터 이름, 데이터 유형, 연도, 월, 계절 등이 미리 선택된 집합 중 하나를 선택할 수 있습니다.
 */
function PresetFields() {
  const { control, formState, watch, reset } =
    useFormContext<SettingsFormValues>();

  const defaultValues = formState.defaultValues;

  const mode = watch('mode');

  const isHidden = mode !== 'preset';

  useEffect(() => {
    if (!defaultValues) {
      throw new Error(`SettingsForm has no defaultValues.`);
    }
  }, [defaultValues]);

  if (isHidden) return null;

  return (
    <section>
      <FormField
        name="dataCollectionKey"
        control={control}
        render={({ field }) => {
          return (
            <RadioGroup
              className="gap-2"
              value={field.value}
              onValueChange={(dataCollectionKey: DataCollectionKey) => {
                reset({
                  ...defaultValues,
                  dataCollectionKey,
                  mode,
                });
              }}
            >
              {dataCollectionSchema.getAllKeys().map((dataCollectionKey) => {
                const label =
                  dataCollectionKey === 'YEARLY'
                    ? '매년'
                    : dataCollectionKey === 'SEASONALLY'
                    ? '사계절마다'
                    : dataCollectionKey === 'MONTHLY'
                    ? '매달'
                    : dataCollectionKey === 'WEEKLY'
                    ? '매주'
                    : dataCollectionKey === 'WEEKDAILY'
                    ? '요일마다'
                    : dataCollectionKey === 'DAILY'
                    ? '매일'
                    : '';

                return (
                  <label
                    key={dataCollectionKey}
                    className={cn(
                      'relative flex w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 shadow-sm',
                      field.value === dataCollectionKey &&
                        'bg-accent/50 shadow-inner'
                    )}
                  >
                    <p className="text-sm">
                      {[
                        label.concat(' 나타나는'),
                        dataNameSchema
                          .display(defaultValues?.dataNameKey!)
                          .concat('의 패턴'),
                      ].join(' ')}
                    </p>
                    <RadioGroupItem value={dataCollectionKey} />
                  </label>
                );
              })}
            </RadioGroup>
          );
        }}
      />
    </section>
  );
}

export default PresetFields;
