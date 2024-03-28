import gsap from 'gsap'

import { registerHitboxOutTimeline, registerTileHitboxInTimeline } from '#pixi/grid/timeline/hitbox'
import { registerHoverOutTimeline, registerTileHoverInTimeline } from '#pixi/grid/timeline/hover'
import { registerTileIdleTimeline } from '#pixi/grid/timeline/idle'
import { registerTileSetPosition } from '#pixi/grid/timeline/position'
import { Tile, TileTimelines } from '#pixi/types'
import { TILE_TIMELINE } from '#src/lib/constants'
import { R } from '#src/utils'

interface CreateTileTimelinesProps {
  tiles: Tile[]
}

export const createTileTimelines = ({ tiles }: CreateTileTimelinesProps) => {
  const idleTiles: Tile[] = []
  tiles.forEach(tile => {
    const timelines: TileTimelines = {
      [TILE_TIMELINE.HOVER_IN]: gsap.timeline({
        paused: true,
        repeatRefresh: true,
        onComplete: () => {
          timelines[TILE_TIMELINE.HOVER_OUT].restart()
        },
      }),
      [TILE_TIMELINE.HOVER_OUT]: gsap.timeline({
        paused: true,
        repeatRefresh: true,
      }),
      [TILE_TIMELINE.HITBOX_IN]: gsap.timeline({
        paused: true,
        repeatRefresh: true,
        onComplete: () => {
          timelines[TILE_TIMELINE.HITBOX_OUT].restart()
        },
      }),
      [TILE_TIMELINE.HITBOX_OUT]: gsap.timeline({
        paused: true,
      }),
      [TILE_TIMELINE.IDLE]: gsap.timeline({
        repeat: -1,
        repeatRefresh: true,
        repeatDelay: R(3, 4),
        paused: true, // init pause - start on register!
      }),
    }

    // todo: to utils -> generator function since we use it in multiple places below
    const skewXOut = R(-2, 2)
    const skewYOut = R(-2, 2)

    const scaleHoverIn = R(1, 1.5)
    const inDuration = R(0.2, 0.6)
    const inEase = 'power.in'

    const scaleHoverOut = 0
    const outDuration = R(0.5, 1.2)
    const outEase = 'sine.inOut'

    const scaleIdleIn = R(0.01, 0.29)
    const idleOutDuration = R(0.5, 4)

    const scaleHitboxIn = R(0.05, 0.2)

    /* SETUP */
    gsap.set(tile.container, {
      rotation: (R(-60, 60) * Math.PI) / 180,
      alpha: 0,
    })
    gsap.set(tile.container.scale, {
      x: 0,
      y: 0,
    })

    const chance = Math.random() > 0.9
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
      registerTileSetPosition({
        tile,
        inDuration,
        inEase,
        outDuration,
        outEase,
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

    tiles[tile.id].timelines = timelines
  })

  const randomizeTiles = idleTiles.sort(() => 0.5 - Math.random())
  let i = 0
  randomizeTiles.forEach(tile => {
    if (!tile.timelines) return
    tile.timelines[TILE_TIMELINE.IDLE].play(-i * 0.02)
    i++
  })
}
