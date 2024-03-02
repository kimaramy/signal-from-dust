'use client';

import { useMemo } from 'react';

import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import { project } from '@/lib/project';
import { Link } from '@/lib/router';
import { Button, type ButtonProps } from '@/components/ui/button';

interface BookLinkProps
  extends Omit<ButtonProps, 'variant' | 'size' | 'children' | 'asChild'> {
  variant: 'text' | 'icon';
  iconClassName?: string;
}

function BookLink({
  variant,
  className,
  iconClassName,
  ...rest
}: BookLinkProps) {
  const {
    dictionary: { intro },
  } = useLocaleDictionary();

  const styles = useMemo<ButtonProps>(() => {
    if (variant === 'text') {
      return {
        variant: 'link',
        size: 'sm',
      };
    }
    return {
      variant: 'ghost',
      size: 'icon',
    };
  }, [variant]);

  return (
    <Button asChild className={cn('px-0', className)} {...styles} {...rest}>
      <Link href={project.url.docs} target="_blank">
        <span className={variant === 'icon' ? 'sr-only' : ''}>
          {intro.content.docs}
        </span>
        {variant === 'text' ? (
          <Icon.ChevronRight
            aria-hidden
            className={cn('h-4 w-3.5', iconClassName)}
          />
        ) : (
          <Icon.Book aria-hidden className={cn('h-4 w-4', iconClassName)} />
        )}
      </Link>
    </Button>
  );
}

export default BookLink;
