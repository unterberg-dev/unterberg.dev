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
import { Tile } from '#components/pixi/types'
import { R } from '#lib/utils'
import { TILE_TIMELINE } from '#root/lib/constants'

interface CreateTileTimelinesProps {
  tiles: Tile[]
}

export const createTileTimelines = ({ tiles }: CreateTileTimelinesProps) => {
  const idleTiles: Tile[] = []
  tiles.forEach(tile => {
    // todo: to utils -> generator function since we use it in multiple places below
    const skewXOut = R(-2, 2)
    const skewYOut = R(-2, 2)

    const scaleHoverIn = R(0.8, 1.1)
    const inDuration = R(0.1, 0.5)
    const inEase = 'power.in'

    const scaleHoverOut = 0
    const outDuration = R(0.5, 1.2)
    const outEase = 'sine.inOut'

    const scaleIdleIn = R(0.01, 0.29)
    const idleOutDuration = R(0.5, 4)

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

    const chance = Math.random() > 0.9
    const { timelines } = tile

    if (!timelines) {
      return
    }

    if (chance) {
      registerTileIdleTimeline({
        tile,
        timeline: timelines[TILE_TIMELINE.IDLE],
        inEase,
        scaleIn: scaleIdleIn,
        outEase,
        outDuration: idleOutDuration,
      })

      idleTiles.push(tile)
    } else {
      /* HOVER IN */
      registerTileHoverInTimeline({
        tile,
        timeline: timelines[TILE_TIMELINE.HOVER_IN],
        skewXOut,
        skewYOut,
        inDuration,
        inEase,
        scaleHoverIn,
      })

      /* HOVER OUT */
      registerHoverOutTimeline({
        tile,
        timeline: timelines[TILE_TIMELINE.HOVER_OUT],
        skewXOut,
        skewYOut,
        outDuration,
        outEase,
        scaleHoverOut,
      })

      /* QUICKSET POSITION */
      registerPositionTimeline({
        tile,
        timeline: timelines[TILE_TIMELINE.POSITION],
        inDuration,
        inEase,
        outDuration,
      })

      registerTileHitboxInTimeline({
        tile,
        timeline: timelines[TILE_TIMELINE.HITBOX_IN],
        inDuration,
        inEase,
        scaleIn: scaleHitboxIn,
      })

      registerHitboxOutTimeline({
        tile,
        timeline: timelines[TILE_TIMELINE.HITBOX_OUT],
        outDuration,
        outEase,
      })
    }
  })

  const randomizeTiles = idleTiles.sort(() => 0.5 - Math.random())
  randomizeTiles.forEach(tile => {
    if (!tile.timelines) return
    tile.timelines[TILE_TIMELINE.IDLE].play()
  })
}
