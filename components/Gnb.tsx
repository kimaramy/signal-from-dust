import { Link } from '@/lib/router';
import { seoConfig } from '@/lib/seo';
import { buttonVariants } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import ThemeToggleButton from '@/components/ThemeToggleButton';

export default function Gnb() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-body">
      <div className="flex h-nav items-center space-x-4 px-4 3xl:container sm:justify-between sm:space-x-0 md:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={seoConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                })}
              >
                <Icon.Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggleButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
