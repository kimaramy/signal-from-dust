'use client';

import { cn } from '@/lib/css';
import { Icon } from '@/lib/icon';
import { Button, ButtonProps } from '@/components/ui/button';

interface PlayerButtonProps extends ButtonProps {
  isPlaying: boolean;
  iconClassName?: string;
}

function PlayerButton({
  isPlaying,
  iconClassName,
  className,
  ...rest
}: PlayerButtonProps) {
  return (
    <Button
      variant={isPlaying ? 'default' : 'ghost'}
      size="icon"
      className={cn('h-9 w-9', className)}
      {...rest}
    >
      {isPlaying ? (
        <Icon.Pause aria-hidden className={cn('h-4 w-4', iconClassName)} />
      ) : (
        <Icon.Play aria-hidden className={cn('h-4 w-4', iconClassName)} />
      )}
      <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
    </Button>
  );
}

export default PlayerButton;
