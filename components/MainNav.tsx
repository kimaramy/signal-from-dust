import Image from 'next/image';
import Link from 'next/link';

import { NavItem } from '@/types/nav';
import { siteConfig } from '@/config/site';
import { CollectionSelect } from '@/components/collection';
import { DisplaySelect } from '@/components/display';
import { DustSizeSelect } from '@/components/dustSize';
import Logo from '@/components/Logo';
import { MonthSelect } from '@/components/month';
import { SeasonSelect } from '@/components/season';
import { YearSelect } from '@/components/year';

export interface MainNavProps {
  routes?: NavItem[];
}

export default function MainNav({ routes }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Logo />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      <div className="flex gap-2">
        <DisplaySelect />
        <DustSizeSelect />
        {/* <LocationSelect /> */}
        <CollectionSelect />
        <YearSelect />
        <SeasonSelect />
        <MonthSelect />
      </div>
      {/* {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null} */}
    </div>
  );
}
