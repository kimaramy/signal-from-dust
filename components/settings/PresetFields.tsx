'use client';

import { useCallback } from 'react';
import { useMountEffect, useUpdateEffect } from '@/hooks';
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

  const dataCollectionKey = watch('dataCollectionKey');

  const isPresetMode = mode === 'preset';

  const handleValueChange = useCallback(
    (dataCollectionKey: DataCollectionKey) => {
      reset({
        ...defaultValues,
        dataCollectionKey,
        mode: 'preset',
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [defaultValues]
  );

  useMountEffect(() => {
    if (!defaultValues) {
      throw new Error(`SettingsForm must have defaultValues.`);
    }
  });

  useUpdateEffect(() => {
    if (isPresetMode) {
      reset({
        ...defaultValues,
        mode: 'preset',
      });
    }
  }, [isPresetMode]);

  if (!isPresetMode) return null;

  return (
    <section>
      <h4 className="pb-3 text-sm">
        <span className="inline-block rounded bg-muted px-1.5 py-0.5 font-bold">
          {getPresetLabel(dataCollectionKey)}
        </span>
        {[
          ' 나타나는',
          dataNameSchema.display(defaultValues?.dataNameKey!).concat('의 패턴'),
        ].join(' ')}
      </h4>
      <FormField
        name="dataCollectionKey"
        control={control}
        render={({ field }) => {
          return (
            <RadioGroup
              className="grid grid-cols-2 gap-2"
              value={field.value}
              onValueChange={handleValueChange}
            >
              {dataCollectionSchema
                .getAllKeys()
                .reverse()
                .map((dataCollectionKey) => {
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
                        {getPresetLabel(dataCollectionKey)}
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

function getPresetLabel(dataCollectionKey: DataCollectionKey) {
  return dataCollectionKey === 'YEARLY'
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
}

export default PresetFields;
