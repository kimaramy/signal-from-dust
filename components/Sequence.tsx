import Scene from "./Scene"

export interface SequenceProps {
  id: string
  decimals: number[]
  disabled?: boolean
}

export default function Sequence({
  id,
  decimals,
  disabled = false,
}: SequenceProps) {
  const sequenceCtx = [id]

  const largestDecimal = decimals.reduce((acc, curr) => {
    if (acc >= curr) return acc
    return curr
  }, decimals[0])

  const sceneLength = largestDecimal.toString(2).length

  return (
    <section id={id} className="relative w-full h-full p-4">
      <ul
        className="grid h-full gap-2 lg:gap-4"
        style={{
          gridTemplateRows: `repeat(${decimals.length}, minmax(2rem, 1fr))`,
        }}
      >
        {decimals.map((decimal, i) => {
          const sceneContext = sequenceCtx.concat(`${i}`)
          const sceneId = sceneContext.join("-")
          return (
            <Scene
              key={sceneId}
              id={sceneId}
              context={sceneContext}
              length={sceneLength}
              decimal={decimal}
              active={i === 0}
            />
          )
        })}
      </ul>
    </section>
  )
}
