import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { FormField } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Collection, collections } from '@/components/collection';

import { translateDustSize } from '../dustSize';
import type { SettingsFormData } from './SettingsForm';

interface PresetFieldsProps {
  defaultValues: SettingsFormData;
}

/**
 * 데이터 이름, 데이터 유형, 연도, 월, 계절 등이 미리 선택된 집합 중 하나를 선택할 수 있습니다.
 */
function PresetFields({ defaultValues }: PresetFieldsProps) {
  const { control, watch, reset } = useFormContext<SettingsFormData>();

  const mode = watch('mode');

  const isVisible = mode === 'preset';

  if (!isVisible) return null;

  return (
    <section>
      <FormField
        name="dataCollection"
        control={control}
        render={({ field }) => {
          return (
            <RadioGroup
              className="gap-2"
              value={field.value}
              onValueChange={(value: Collection) => {
                reset({
                  ...defaultValues,
                  dataCollection: value,
                });
              }}
            >
              {collections.map((collection) => {
                const label =
                  collection === 'Yearly'
                    ? '매년'
                    : collection === 'Seasonally'
                    ? '사계절마다'
                    : collection === 'Monthly'
                    ? '매월'
                    : collection === 'Weekly'
                    ? '매주'
                    : collection === 'Weekdaily'
                    ? '요일마다'
                    : collection === 'Daily'
                    ? '매일'
                    : '';

                return (
                  <label
                    key={collection}
                    className={cn(
                      'relative flex w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 shadow-sm',
                      field.value === collection && 'bg-accent/50 shadow-inner'
                    )}
                  >
                    <p className="text-sm">
                      {[
                        label.concat(' 나타나는'),
                        translateDustSize(defaultValues.dataName).concat(
                          '의 패턴'
                        ),
                      ].join(' ')}
                    </p>
                    <RadioGroupItem value={collection} />
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
