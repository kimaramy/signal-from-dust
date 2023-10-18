import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"

import { DataUnitSelect } from "./data-unit-select"
import { LocationSelect } from "./location-select"
import { MonthSelect } from "./month-select"
import { YearSelect } from "./year-select"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        {/* <div className="h-6 w-6"></div> */}
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      <div className="flex gap-2">
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
  )
}
