import Link from 'next/link';

import { NavItem } from '@/types/nav';
import { siteConfig } from '@/config/site';

import DataUnitSelect from './DataUnitSelect';
import LocationSelect from './LocationSelect';
import MonthSelect from './MonthSelect';
import ViewSelect from './ViewSelect';
import YearSelect from './YearSelect';

export interface MainNavProps {
  routes?: NavItem[];
}

export default function MainNav({ routes }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        {/* <div className="h-6 w-6"></div> */}
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      <div className="flex gap-2">
        <ViewSelect />
        <LocationSelect />
        <DataUnitSelect />
        <YearSelect />
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
