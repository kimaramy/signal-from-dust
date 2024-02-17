import React from 'react';

import { cn } from '@/lib/css';

interface ButtonGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  items: React.ReactNode[];
}

function ButtonGroup({ items, className, ...rest }: ButtonGroupProps) {
  return (
    <ul
      className={cn(
        'flex max-h-9 items-center divide-x divide-primary/20 rounded-md border border-primary/20 shadow-sm hover:overflow-hidden focus-visible:overflow-hidden',
        className
      )}
      {...rest}
    >
      {items.filter(Boolean).map((item, idx) => (
        <li key={idx} className="[&_a]:rounded-none [&_button]:rounded-none">
          {item}
        </li>
      ))}
    </ul>
  );
}

export { ButtonGroup };
