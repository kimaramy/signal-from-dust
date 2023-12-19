'use client';

import { useCallback } from 'react';
import { useMountEffect, useUpdateEffect } from '@/hooks';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { FormField } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { collectionSchema, type CollectionKey } from '@/components/collection';
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

  const collectionKey = watch('collectionKey');

  const isPresetMode = mode === 'preset';

  const handleValueChange = useCallback(
    (collectionKey: CollectionKey) => {
      reset({
        ...defaultValues,
        collectionKey,
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
      <h3 className="pb-3 text-sm">
        <span className="inline-block rounded bg-muted px-1.5 py-0.5 font-bold">
          {getPresetLabel(collectionKey)}
        </span>
        {[
          ' 나타나는',
          dataNameSchema.display(defaultValues?.dataNameKey!).concat('의 패턴'),
        ].join(' ')}
      </h3>
      <FormField
        name="collectionKey"
        control={control}
        render={({ field }) => {
          return (
            <RadioGroup
              className="grid grid-cols-2 gap-2"
              value={field.value}
              onValueChange={handleValueChange}
            >
              {collectionSchema
                .getAllKeys()
                .reverse()
                .map((collectionKey) => {
                  return (
                    <label
                      key={collectionKey}
                      className={cn(
                        'relative flex w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 shadow-sm',
                        field.value === collectionKey &&
                          'bg-accent/50 shadow-inner'
                      )}
                    >
                      <p className="text-sm">{getPresetLabel(collectionKey)}</p>
                      <RadioGroupItem value={collectionKey} />
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

function getPresetLabel(collectionKey: CollectionKey) {
  return collectionKey === 'YEARLY'
    ? '매년'
    : collectionKey === 'SEASONALLY'
    ? '사계절마다'
    : collectionKey === 'MONTHLY'
    ? '매달'
    : collectionKey === 'WEEKLY'
    ? '매주'
    : collectionKey === 'WEEKDAILY'
    ? '요일마다'
    : collectionKey === 'DAILY'
    ? '매일'
    : '';
}

export default PresetFields;
