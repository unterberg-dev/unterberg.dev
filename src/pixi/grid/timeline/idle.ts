import { Tile } from '#pixi/types'
import { R } from '#src/utils'

interface RegisterHoverInTimelineProps {
  timeline: gsap.core.Timeline
  tile: Tile
  inDuration: number
  inEase: string
  outDuration: number
  outEase: string
  scaleIn: number
}

export const registerIdleTimeline = ({
  timeline,
  inDuration,
  inEase,
  tile,
  scaleIn,
  outEase,
}: RegisterHoverInTimelineProps) => {
  timeline.to(
    tile.container,
    {
      ease: inEase,
      delay: R(3, 0.5),
      repeatDelay: R(0.5, 1),
      x: tile.x + R(-200, 200),
      y: tile.y + R(-200, 200),
      yoyoEase: outEase,
      alpha: R(0.0, 0.6),
      duration: inDuration * R(1.4, 2.1),
    },
    '<',
  )
  timeline.to(
    tile.container.scale,
    {
      ease: inEase,
      yoyoEase: outEase,
      delay: R(4.1, 0.5),
      repeatDelay: R(0.5, 1),
      duration: inDuration * R(1.4, 4.1),
      x: scaleIn,
      y: scaleIn,
    },
    '<',
  )

  timeline.play()
}
