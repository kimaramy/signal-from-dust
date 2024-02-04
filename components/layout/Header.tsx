import React from 'react';

import { cn } from '@/lib/css';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(function Header(
  { className, children, ...rest },
  ref
) {
  return (
    <header
      ref={ref}
      className={cn(
        'bg-white/15 sticky left-0 top-0 z-50 w-full border-b border-border backdrop-blur dark:border-primary/20',
        className
      )}
      {...rest}
    >
      {children}
    </header>
  );
});

export default Header;
