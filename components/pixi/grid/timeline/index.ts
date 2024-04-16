import gsap from 'gsap'

import {
  registerHitboxOutTimeline,
  registerTileHitboxInTimeline,
} from '#components/pixi/grid/timeline/hitbox'
import {
  registerHoverOutTimeline,
  registerTileHoverInTimeline,
} from '#components/pixi/grid/timeline/hover'
import { registerTileIdleTimeline } from '#components/pixi/grid/timeline/idle'
import { registerPositionTimeline } from '#components/pixi/grid/timeline/position'
import { Tile, TileTimelines } from '#components/pixi/types'
import { R } from '#pixi/utils'
import { IDLE_TILE_TIMELINE, TILE_TIMELINE } from '#root/lib/constants'

interface CreateTileTimelinesProps {
  tiles: Tile[]
}

export const createTileTimelines = ({ tiles }: CreateTileTimelinesProps) => {
  const idleTiles: Tile[] = []
  tiles.forEach(tile => {
    // todo: to utils -> generator function since we use it in multiple places below
    const skewXOut = R(-2, 2)
    const skewYOut = R(-2, 2)

    const inDuration = R(0.2, 0.5)
    const inEase = 'power.in'

    const outDuration = R(0.5, 1.2)
    const outEase = 'sine.inOut'

    const scaleHitboxIn = R(0.05, 0.2)

    /* SETUP */
    gsap.set(tile.innerContainer, {
      rotation: (R(-60, 60) * Math.PI) / 180,
      alpha: 0,
    })
    gsap.set(tile.innerContainer.scale, {
      x: 0,
      y: 0,
    })

    // todo: constants
    const { timelines } = tile

    if (!timelines) {
      return
    }

    if (tile.idle) {
      registerTileIdleTimeline({
        tile,
        timeline: timelines[IDLE_TILE_TIMELINE.DEFAULT],
      })

      idleTiles.push(tile)
    } else {
      const typeTimelines = timelines as TileTimelines

      /* HOVER IN */
      registerTileHoverInTimeline({
        tile,
        timeline: typeTimelines[TILE_TIMELINE.HOVER_IN],
        skewXOut,
        skewYOut,
        inDuration,
        inEase,
      })

      /* HOVER OUT */
      registerHoverOutTimeline({
        tile,
        timeline: typeTimelines[TILE_TIMELINE.HOVER_OUT],
        skewXOut,
        skewYOut,
        outDuration,
        outEase,
      })

      /* QUICKSET POSITION */
      registerPositionTimeline({
        tile,
        timeline: typeTimelines[TILE_TIMELINE.POSITION],
        inDuration,
        inEase,
        outDuration,
      })

      registerTileHitboxInTimeline({
        tile,
        timeline: typeTimelines[TILE_TIMELINE.HITBOX_IN],
        inDuration,
        inEase,
        scaleIn: scaleHitboxIn,
      })

      registerHitboxOutTimeline({
        tile,
        timeline: typeTimelines[TILE_TIMELINE.HITBOX_OUT],
        outDuration,
        outEase,
      })
    }
  })

  idleTiles.forEach(tile => {
    if (!tile.timelines) return
    tile.timelines[IDLE_TILE_TIMELINE.DEFAULT].play()
  })
}
