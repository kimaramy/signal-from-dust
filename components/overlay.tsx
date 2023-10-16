"use client"

import React from "react"

import { cn } from "@/lib/utils"

export interface OverlayProps {
  className?: string
}

export function Overlay({ className }: OverlayProps) {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 h-full w-full cursor-pointer rounded-sm bg-black/10 backdrop-blur-sm",
        className
      )}
    ></div>
  )
}
