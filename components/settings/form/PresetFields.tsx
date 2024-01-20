'use client';

import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/css';
import { useMountEffect, useUpdateEffect } from '@/lib/hooks';
import { useLocaleDictionary } from '@/lib/i18n';
import { CollectionUtils, DustUtils, LocationUtils } from '@/lib/model';
import { FormField } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { type SettingsFormValues } from './SettingsForm';

/**
 * 데이터 이름, 데이터 유형, 연도, 월, 계절 등이 미리 선택된 집합 중 하나를 선택할 수 있습니다.
 */
function PresetFields() {
  const { locale } = useLocaleDictionary();

  const { control, formState, watch, reset } =
    useFormContext<SettingsFormValues>();

  const defaultValues = formState.defaultValues;

  const mode = watch('mode');

  const collectionKey = watch('collectionKey');

  const isPresetMode = mode === 'preset';

  const location = LocationUtils.schema.display(
    LocationUtils.schema.defaultKey,
    locale
  );

  const dust = DustUtils.schema.display(defaultValues?.dustKey!, locale);

  const labelTitle = CollectionUtils.schema.display(
    collectionKey,
    locale,
    'patterned'
  );

  const labelDescription = (function () {
    switch (locale) {
      case 'ko':
        return [' 나타나는', `${location}의`, `${dust} 패턴`].join(' ');
      case 'en':
      default:
        return ['Pattern of', `${dust} in ${location},`].join(' ');
    }
  })();

  const handleValueChange = useCallback(
    (collectionKey: CollectionUtils.Key) => {
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
      <h3
        className={cn(
          'flex items-baseline gap-1 pb-3 text-sm',
          locale === 'en'
            ? 'flex-row-reverse justify-end'
            : 'flex-row justify-start'
        )}
      >
        <span className="inline-block rounded bg-muted px-1.5 py-0.5 font-bold">
          {labelTitle}
        </span>
        {labelDescription}
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
              {CollectionUtils.schema
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
                      <p className="text-sm">
                        {CollectionUtils.schema.display(
                          collectionKey,
                          locale,
                          'patterned'
                        )}
                      </p>
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

export default PresetFields;
