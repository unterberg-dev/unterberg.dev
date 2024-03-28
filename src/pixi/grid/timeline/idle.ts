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

export const registerTileIdleTimeline = ({
  timeline,
  outDuration,
  inEase,
  tile,
  scaleIn,
  outEase,
}: RegisterTileIdleTimelineProps) => {
  timeline.to(
    tile.container,
    {
      ease: inEase,
      alpha: R(0.0, 0.6),
      duration: outDuration * R(1.4, 2.1),
    },
    '<',
  )
  timeline.to(
    tile.container.scale,
    {
      ease: inEase,
      yoyoEase: outEase,
      duration: outDuration * R(1.4, 2.1),
      x: scaleIn,
      y: scaleIn,
    },
    '<',
  )

  timeline.play()
}
