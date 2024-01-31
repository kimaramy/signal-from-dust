import React from 'react';

interface ButtonGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  items: React.ReactNode[];
}

function ButtonGroup({ items, ...rest }: ButtonGroupProps) {
  return (
    <ul
      className="flex max-h-9 items-center divide-x divide-primary/20 overflow-hidden rounded-md border border-primary/20 shadow-sm"
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
