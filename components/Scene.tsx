"use client"

import React, { useCallback, useEffect, useState } from "react"
import { LucidePauseCircle, LucidePlayCircle } from "lucide-react"

import Bit from "./Bit"
import Overlay from "./Overlay"
import { Button } from "./ui/button"

export interface SceneProps {
  id: string
  context: string[]
  decimal: number
  length?: number
  active?: boolean
  className?: string
}

export default function Scene({
  id,
  context,
  decimal,
  length = 8,
  active = false,
}: SceneProps) {
  const binaries = decimal.toString(2).split("")

  const [isMouseOver, setMouseOver] = useState(false)

  const handleMouseOver = useCallback(() => {
    setMouseOver(true)
  }, [])

  const handleMouseOut = useCallback(() => {
    setMouseOver(false)
  }, [])

  // const [sequenceHeight, setSequenceHeight] = useState(0)

  // useEffect(() => {
  //   const sequenceElement = document.getElementById(context[0]) as HTMLElement
  //   const resizeObserver = new ResizeObserver((event) => {
  //     // Depending on the layout, you may need to swap inlineSize with blockSize
  //     // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
  //     setSequenceHeight(event[0].contentBoxSize[0].blockSize)
  //   })
  //   resizeObserver.observe(sequenceElement)
  //   return () => {
  //     resizeObserver.unobserve(sequenceElement)
  //   }
  // }, [context])

  // useEffect(() => {
  //   console.log(sequenceHeight)
  // }, [sequenceHeight])

  return (
    <li id={id} className="flex h-full items-center gap-8">
      <Button variant="ghost" size="icon">
        {active ? <LucidePauseCircle /> : <LucidePlayCircle />}
      </Button>
      <ul
        className="relative grid h-full w-full gap-2 lg:gap-4"
        style={{
          gridTemplateColumns: `repeat(${length}, 1fr)`,
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {binaries.map((binary, i) => {
          const bitContext = context.concat(`${i}`)
          const bitId = bitContext.join("-")
          return (
            <Bit
              key={bitId}
              id={bitId}
              context={bitContext}
              binary={binary}
              active={bitContext[1] === "0" && bitContext[2] === "0"}
            />
          )
        })}
        {isMouseOver ? <Overlay /> : null}
      </ul>
    </li>
  )
}
