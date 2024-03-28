import { Tile } from '#pixi/types'
import { R } from '#src/utils'

interface RegisterTileHoverInTimelineProps {
  tile: Tile
  timeline: gsap.core.Timeline
  skewXOut: number
  skewYOut: number
  inDuration: number
  inEase: string
  scaleHoverIn: number
}

export const registerTileHoverInTimeline = ({
  tile,
  timeline,
  skewXOut,
  skewYOut,
  inDuration,
  inEase,
  scaleHoverIn,
}: RegisterTileHoverInTimelineProps) => {
  timeline.set(tile.container, {
    alpha: 0,
    rotation: (R(-60, 60) * Math.PI) / 180,
    x: tile.x,
    y: tile.y,
  })
  timeline.set(tile.container.scale, {
    x: 0,
    y: 0,
  })
  timeline.set(tile.container.skew, {
    x: skewXOut,
    y: skewYOut,
  })
  timeline.to(
    tile.container,
    {
      ease: inEase,
      alpha: R(0.8, 1),
      duration: inDuration,
      rotation: (R(-60, 60) * Math.PI) / 180,
    },
    '>',
  )
  timeline.to(
    tile.container.scale,
    {
      ease: inEase,
      duration: inDuration,
      x: scaleHoverIn,
      y: scaleHoverIn,
    },
    '<',
  )
  timeline.to(
    tile.container.skew,
    {
      x: 0,
      y: 0,
      ease: inEase,
      duration: inDuration,
    },
    '<',
  )
}

interface RegisterHoverOutTimelineProps {
  tile: Tile
  timeline: gsap.core.Timeline
  skewXOut: number
  skewYOut: number
  outDuration: number
  outEase: string
  scaleHoverOut: number
}

export const registerHoverOutTimeline = ({
  tile,
  skewXOut,
  skewYOut,
  timeline,
  outDuration,
  outEase,
  scaleHoverOut,
}: RegisterHoverOutTimelineProps) => {
  timeline.to(
    tile.container,
    {
      alpha: R(0.5, 0),
      ease: outEase,
      rotation: (R(-60, 60) * Math.PI) / 180,
      duration: outDuration,
    },
    'out',
  )
  timeline.to(
    tile.container.scale,
    {
      x: scaleHoverOut,
      y: scaleHoverOut,
      ease: outEase,
      duration: outDuration,
    },
    'out',
  )
  timeline.to(
    tile.container.skew,
    {
      x: skewXOut,
      y: skewYOut,
      ease: outEase,
      duration: outDuration,
    },
    'out',
  )
}
