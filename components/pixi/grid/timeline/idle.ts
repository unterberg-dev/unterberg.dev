import { Tile } from '#components/pixi/types'
import { R } from '#lib/utils'
import { TILE_TIMELINE } from '#root/lib/constants'

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
  if (tile.timelines) {
    tile.timelines[TILE_TIMELINE.HOVER_IN].kill()
    tile.timelines[TILE_TIMELINE.HOVER_OUT].kill()
    tile.timelines[TILE_TIMELINE.POSITION].kill()
  }

  timeline.set(
    tile.innerContainer,
    {
      alpha: 0,
    },
    '<',
  )
  timeline.set(
    tile.innerContainer.scale,
    {
      x: scaleIn,
      y: scaleIn,
    },
    '<',
  )
  timeline.to(
    tile.innerContainer,
    {
      ease: inEase,
      alpha: R(0.1, 0.6),
      duration: outDuration * R(1.4, 2.1),
    },
    '>',
  )
  timeline.to(
    tile.innerContainer,
    {
      ease: outEase,
      duration: outDuration * R(1.4, 2.1),
      alpha: 0,
    },
    '>',
  )
}
