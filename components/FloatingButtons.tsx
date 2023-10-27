import { cn } from '@/lib/utils';
import { DisplayToggleButton, useDisplayValue } from '@/components/display';
import SettingsSheetTriggerButton from '@/components/settings/SettingsSheetTriggerButton';
import ThemeToggleButton from '@/components/ThemeToggleButton';

export default function FloatingButtons() {
  const display = useDisplayValue();

  return (
    <div
      className={cn(
        'fixed left-[2%] z-50 flex items-center justify-center gap-2 rounded-md bg-white p-2 shadow-lg dark:bg-muted',
        display === '2d' ? 'bottom-[4%]' : 'top-[4%]'
      )}
    >
      <SettingsSheetTriggerButton />
      <DisplayToggleButton />
      <ThemeToggleButton />
    </div>
  );
}
