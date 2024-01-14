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
      variant="ghost"
      size="icon"
      className={cn('h-9 w-9', className)}
      {...rest}
    >
      {isPlaying ? (
        <Icon.Pause aria-label="Pause" className="h-3.5 w-3.5" />
      ) : (
        <Icon.Play aria-label="Play" className="h-3.5 w-3.5" />
      )}
    </Button>
  );
}

export default PlayerButton;
