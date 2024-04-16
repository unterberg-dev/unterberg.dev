import { Tile } from '#components/pixi/types'
import { R } from '#pixi/utils'

interface RegisterTileHoverInTimelineProps {
  tile: Tile
  timeline: gsap.core.Timeline
  skewXOut: number
  skewYOut: number
  inDuration: number
  inEase: string
}

export const registerTileHoverInTimeline = ({
  tile,
  timeline,
  skewXOut,
  skewYOut,
  inDuration,
  inEase,
}: RegisterTileHoverInTimelineProps) => {
  // todo: to constants
  const scaleHoverIn = R(0.8, 1.3)

  timeline.set(tile.innerContainer, {
    scale: 1,
    alpha: 0,
    rotation: (R(-60, 60) * Math.PI) / 180,
  })
  timeline.set(tile.innerContainer.scale, {
    x: 0,
    y: 0,
  })
  timeline.set(tile.innerContainer.skew, {
    x: skewXOut,
    y: skewYOut,
  })
  timeline.to(
    tile.innerContainer,
    {
      ease: inEase,
      alpha: R(0.8, 1),
      duration: inDuration,
      rotation: (R(-60, 60) * Math.PI) / 180,
    },
    '>',
  )
  timeline.to(
    tile.innerContainer.scale,
    {
      ease: inEase,
      duration: inDuration,
      x: scaleHoverIn,
      y: scaleHoverIn,
    },
    '<',
  )
  timeline.to(
    tile.innerContainer.skew,
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
}

export const registerHoverOutTimeline = ({
  tile,
  skewXOut,
  skewYOut,
  timeline,
  outDuration,
  outEase,
}: RegisterHoverOutTimelineProps) => {
  timeline.to(
    tile.innerContainer,
    {
      alpha: R(0.5, 0),
      ease: outEase,
      rotation: (R(-60, 60) * Math.PI) / 180,
      duration: outDuration,
    },
    '>',
  )
  timeline.to(
    tile.innerContainer.scale,
    {
      x: 0,
      y: 0,
      ease: outEase,
      duration: outDuration,
    },
    '<',
  )
  timeline.to(
    tile.innerContainer.skew,
    {
      x: skewXOut,
      y: skewYOut,
      ease: outEase,
      duration: outDuration,
    },
    '<',
  )
  timeline.set(
    tile.innerContainer,
    {
      x: 0,
      y: 0,
    },
    '>',
  )
}
