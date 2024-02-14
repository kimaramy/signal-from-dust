'use client';

import { cn } from '@/lib/css';
import { Icon } from '@/lib/icon';
import { Button, ButtonProps } from '@/components/ui/button';

interface PlayerButtonProps extends ButtonProps {
  isPlaying?: boolean;
  isPaused?: boolean;
  isHidden?: boolean;
  isDisabled?: boolean;
  iconClassName?: string;
}

function PlayerButton({
  isPlaying = false,
  isHidden = false,
  iconClassName,
  ...rest
}: PlayerButtonProps) {
  if (isHidden) return null;

  return (
    <Button variant={isPlaying ? 'default' : 'ghost'} size="icon" {...rest}>
      {isPlaying ? (
        <Icon.Pause aria-hidden className={cn('h-4 w-4', iconClassName)} />
      ) : (
        <Icon.Play
          aria-hidden
          className={cn('relative left-px h-4 w-4', iconClassName)}
        />
      )}
      <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
    </Button>
  );
}

function PlayerOverlayButton({
  isPlaying = false,
  isPaused = false,
  isHidden = false,
  isDisabled = false,
  iconClassName,
  ...rest
}: PlayerButtonProps) {
  if (isHidden) return null;

  return (
    <Button
      variant="overlay"
      size="fill"
      disabled={isDisabled}
      data-state={isPlaying ? 'playing' : 'paused'}
      {...rest}
    >
      {isPlaying && !isPaused ? (
        <Icon.PauseSolid aria-hidden className={cn('h-6 w-6', iconClassName)} />
      ) : (
        <Icon.PlaySolid
          aria-hidden
          className={cn('relative left-px h-6 w-6', iconClassName)}
        />
      )}
      <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
    </Button>
  );
}

export { PlayerButton, PlayerOverlayButton };
