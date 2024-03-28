import { Tile } from '#pixi/types'
import { R } from '#src/utils'

interface RegisterTileIdleTimelineProps {
  timeline: gsap.core.Timeline
  tile: Tile
  inEase: string
  outDuration: number
  outEase: string
  scaleIn: number
}

const getPercentChance = (percent = 0.5) => Math.random() < percent

export const registerTileIdleTimeline = ({
  timeline,
  outDuration,
  inEase,
  tile,
  scaleIn,
  outEase,
}: RegisterTileIdleTimelineProps) => {
  timeline.set(
    tile.container,
    {
      x: tile.x,
      y: tile.y,
      alpha: 0,
    },
    '<',
  )
  timeline.set(
    tile.container.scale,
    {
      x: 0,
      y: 0,
    },
    '<',
  )
  timeline.to(
    tile.container,
    {
      ease: inEase,
      alpha: R(0.1, 0.6),
      duration: outDuration * R(1.4, 2.1),
      x: tile.x + (getPercentChance(0.1) ? R(-10, 10) : 0),
      y: tile.y + (getPercentChance(0.1) ? R(-10, 10) : 0),
    },
    '>',
  )
  timeline.to(
    tile.container.scale,
    {
      ease: inEase,
      duration: outDuration * R(1.4, 2.1),
      x: scaleIn,
      y: scaleIn,
    },
    '<',
  )
  timeline.to(
    tile.container,
    {
      x: tile.x + (getPercentChance(0.1) ? R(-10, 10) : 0),
      y: tile.y + (getPercentChance(0.1) ? R(-10, 10) : 0),
      ease: outEase,
      duration: outDuration * R(1.4, 2.1),
      alpha: 0,
    },
    '>',
  )
  timeline.to(
    tile.container.scale,
    {
      x: 0,
      ease: outEase,
      y: 0,
      duration: outDuration * R(1.4, 2.1),
    },
    '<',
  )
}
