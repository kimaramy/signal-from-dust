"use client"

import { Scene, SceneData } from "./scene"

export interface SequenceProps {
  id: string
  dataset: SceneData[]
  disabled?: boolean
}

export function Sequence({ id, dataset, disabled = false }: SequenceProps) {
  const sequenceContext = [id]

  const decimals = dataset.map((data) => data.value);

  const longestSceneLength = Math.max(...decimals).toString(2).length

  return (
    <section id={id} className="relative h-full w-full py-4">
      <ul
        className="grid h-full gap-2 lg:gap-4"
        style={{
          gridTemplateRows: `repeat(${decimals.length}, minmax(2rem, 1fr))`,
        }}
      >
        {dataset.map((data, i) => {
          const sceneContext = sequenceContext.concat(`${i}`)
          const sceneId = sceneContext.join("-")
          return (
            <Scene
              key={sceneId}
              id={sceneId}
              context={sceneContext}
              length={longestSceneLength}
              data={data}
              active={i === 0}
            />
          )
        })}
      </ul>
    </section>
  )
}
