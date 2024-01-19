'use client';

import { cn } from '@/lib/css';
import { Icon } from '@/lib/icon';
import { Button, ButtonProps } from '@/components/ui/button';

interface PlayerButtonProps extends ButtonProps {
  isPlaying: boolean;
}

function PlayerButton({ isPlaying, className, ...rest }: PlayerButtonProps) {
  return (
    <Button
      variant={isPlaying ? 'default' : 'ghost'}
      size="icon"
      className={cn('h-9 w-9', className)}
      {...rest}
    >
      {isPlaying ? (
        <Icon.Pause aria-hidden className="h-4 w-4" />
      ) : (
        <Icon.Play aria-hidden className="h-4 w-4" />
      )}
      <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
    </Button>
  );
}

export default PlayerButton;
