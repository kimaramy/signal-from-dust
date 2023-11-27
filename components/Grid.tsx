import React from 'react';

import { cn } from '@/lib/utils';

interface GridProps<T>
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemKey: string | ((item: T, index: number) => string);
}

function Grid<T>(
  props: GridProps<T>,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  const { items, itemKey, renderItem, className, ...rest } = props;
  return (
    <ul
      ref={ref}
      className={cn(
        'grid h-auto min-h-screen w-full content-center items-center gap-2 overflow-y-scroll p-4 scrollbar-hide lg:p-6',
        className
      )}
      style={{
        gridTemplateRows: `repeat(${items.length}, 2.25rem)`,
      }}
      {...rest}
    >
      {items.map((item, i) => {
        const key = typeof itemKey === 'function' ? itemKey(item, i) : itemKey;
        return (
          <li key={key} className="h-full">
            {renderItem(item, i)}
          </li>
        );
      })}
    </ul>
  );
}

const GridWithRef = React.forwardRef(Grid) as <T>(
  props: GridProps<T> & { ref?: React.ForwardedRef<HTMLUListElement> }
) => ReturnType<typeof Grid>;

export default GridWithRef;
