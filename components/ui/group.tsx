import * as React from 'react';

interface ButtonGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  items: [React.ReactElement, ...React.ReactElement[]];
}

function ButtonGroup({ items, ...rest }: ButtonGroupProps) {
  return (
    <ul
      className="flex divide-x divide-primary/20 overflow-hidden rounded-md border border-primary/20"
      {...rest}
    >
      {items.map((item, idx) => (
        <li key={idx} className="[&_a]:rounded-none [&_button]:rounded-none">
          {item}
        </li>
      ))}
    </ul>
  );
}

export { ButtonGroup };
