import { Tile } from '#components/pixi/types'
import { R } from '#pixi/utils'

interface RegisterTileIdleTimelineProps {
  timeline: gsap.core.Timeline
  tile: Tile
}

export const registerTileIdleTimeline = ({ timeline, tile }: RegisterTileIdleTimelineProps) => {
  // todo: constants
  const scaleIdleIn = R(0.01, 0.29)
  const idleDuration = R(1.4, 2.1)

  timeline.set(tile.innerContainer, {
    alpha: 0,
  })
  timeline.set(
    tile.innerContainer.scale,
    {
      x: scaleIdleIn,
      y: scaleIdleIn,
    },
    '<',
  )
  timeline.to(
    tile.innerContainer,
    {
      alpha: R(0.1, 0.6),
      duration: idleDuration,
    },
    '>',
  )
  timeline.to(
    tile.innerContainer,
    {
      duration: idleDuration,
      alpha: 0,
    },
    '>',
  )
}
