"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { random } from "lodash-es"

import { cn } from "@/lib/utils"

export interface BitProps {
  id: string
  context: (string | number)[]
  binary: string
  active?: boolean
  className?: string
}

export default function Bit({
  id,
  context,
  binary,
  active = false,
  className,
}: BitProps) {
  const activated = useRef(active)

  const randomLength = useMemo(
    () => (binary === "0" ? random(20, 40) : random(80, 100)),
    [binary]
  )

  const [isTriggered, setTriggered] = useState(false)

  useEffect(() => {
    const bitIndex = context[2] as number

    const timeout = setTimeout(() => {
      setTriggered(true)
    }, (bitIndex + 1) * 200)

    return () => clearTimeout(timeout)
  }, [context])

  return (
    <li id={id} className={cn("relative isolate flex h-full", className)}>
      {isTriggered ? (
        <>
          <div
            className={cn(
              "flex duration-500 ease-out animate-in fade-in zoom-in slide-in-from-left",
              binary === "0"
                ? "min-w-[50%] xl:min-w-[auto]"
                : "min-w-full xl:min-w-[auto]"
            )}
            style={{
              width: `${randomLength}%`,
            }}
          >
            <div
              className={cn(
                "w-4 flex-none lg:w-6 2xl:w-8",
                "grainy-to-left dark:grainy-to-left--dark"
              )}
            ></div>
            <div
              className={cn(
                "w-full flex-1",
                "grainy-to-right dark:grainy-to-right--dark"
              )}
            ></div>
          </div>
          <div className="absolute left-0 top-0 h-full w-full bg-body mix-blend-multiply dark:mix-blend-difference"></div>
        </>
      ) : null}
    </li>
  )
}
