"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"

export interface BitProps {
  id: string
  context: string[]
  binary: string
  active?: boolean
  className?: string
}

export function Bit({
  id,
  context,
  binary,
  active = false,
  className,
}: BitProps) {
  const activated = useRef(active)

  return (
    <li id={id} className={cn("relative flex h-full", className)}>
      <div
        className={cn(
          "flex",
          binary === "0" ? "w-3/5" : "w-full",
          active ? "opacity-100" : "opacity-70"
        )}
      >
        <div
          className={cn(
            "w-8 flex-none",
            "grainy-to-left dark:grainy-to-left--dark",
            !activated.current &&
              "grainy-to-left--disabled dark:grainy-to-left--dark--disabled"
          )}
        ></div>
        <div
          className={cn(
            "w-full flex-1",
            "grainy-to-right dark:grainy-to-right--dark",
            !activated.current &&
              "grainy-to-right--disabled dark:grainy-to-right--dark--disabled"
          )}
        ></div>
      </div>
    </li>
  )
}
