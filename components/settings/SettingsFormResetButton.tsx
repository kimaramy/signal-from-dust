'use client';

import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import type { SettingsFormValues } from './SettingsForm';

function SettingsFormResetButton() {
  const { reset, formState, watch } = useFormContext<SettingsFormValues>();

  const mode = watch('mode');

  const isHidden = mode === 'preset';

  if (isHidden) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      disabled={!formState.isDirty}
      onClick={() =>
        reset({
          ...formState.defaultValues,
          mode,
        })
      }
    >
      <ArrowPathIcon className="h-4 w-4" />
      <span className="sr-only">Reset</span>
    </Button>
  );
}

export default SettingsFormResetButton;
