import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/css';

const headerVariants = cva(
  'left-0 top-0 z-50 w-full border-b border-border dark:border-white/20',
  {
    variants: {
      position: {
        sticky: 'sticky bg-white/15 backdrop-blur',
        fixed: 'fixed',
      },
    },
    defaultVariants: {
      position: 'sticky',
    },
  }
);

interface HeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerVariants> {
  position: 'sticky' | 'fixed';
}

function Header({ position, className, children, ...rest }: HeaderProps) {
  return (
    <header className={cn(headerVariants({ position, className }))} {...rest}>
      {children}
    </header>
  );
}

export default Header;
