import { forwardRef } from 'react';
import NextLink from 'next/link';

import progress from '../progress';
import { shouldTriggerStartEvent } from '../utils';

const Link = forwardRef<HTMLAnchorElement, React.ComponentProps<'a'>>(
  function Link({ href, onClick, ...rest }, ref) {
    const useLink = href && href.startsWith('/');
    if (!useLink) return <a href={href} onClick={onClick} {...rest} />;

    return (
      <NextLink
        href={href}
        onClick={(event) => {
          if (shouldTriggerStartEvent(href, event)) progress.start();
          if (onClick) onClick(event);
        }}
        {...rest}
        ref={ref}
      />
    );
  }
);

export default Link;
