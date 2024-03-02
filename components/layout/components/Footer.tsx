import React from 'react';

import { cn } from '@/lib/css';
import { project } from '@/lib/project';
import { Link } from '@/lib/router';
import { GithubLink } from '@/components/ui/links';
import { SafeArea } from '@/components/ui/safe-area';
import { BookLink } from '@/components/intro';
import { LocaleToggleButton } from '@/components/locale';
import { ThemeToggleButton } from '@/components/theme';

const Footer = React.forwardRef<HTMLDivElement, React.ComponentProps<'footer'>>(
  function Footer({ className, ...rest }, ref) {
    return (
      <footer
        ref={ref}
        className={cn('bg-body px-safe pb-safe-offset-4', className)}
        {...rest}
      >
        <SafeArea className="flex items-center justify-between px-4">
          <p className="flex flex-1 flex-wrap items-center gap-1 text-xs tracking-tight">
            <span>&copy; {new Date().getFullYear()}.</span>
            <Link href={project.author.url.github}>
              <span>Haram Kim</span>
            </Link>
          </p>
          <ul className="flex flex-none gap-1.5">
            <li>
              <ThemeToggleButton />
            </li>
            <li>
              <LocaleToggleButton />
            </li>
            <li>
              <BookLink variant="icon" />
            </li>
            <li>
              <GithubLink href={project.url.repo} />
            </li>
          </ul>
        </SafeArea>
      </footer>
    );
  }
);

export default Footer;
