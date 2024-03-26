import gsap from 'gsap'

import { registerHitboxInTimeline, registerHitboxOutTimeline } from '#pixi/grid/timeline/hitbox'
import { registerHoverInTimeline, registerHoverOutTimeline } from '#pixi/grid/timeline/hover'
import { registerSetPosition } from '#pixi/grid/timeline/position'
import { Tile, Timelines } from '#pixi/types'
import { TIMELINE } from '#src/lib/constants'
import { R } from '#src/utils'

interface CreateTimelinesProps {
  tiles: Tile[]
}

export const createTimelines = ({ tiles }: CreateTimelinesProps) => {
  tiles.forEach(tile => {
    const timelines: Timelines = {
      [TIMELINE.HOVER_IN]: gsap.timeline({
        paused: true,
        repeatRefresh: true,
        onComplete: () => {
          timelines[TIMELINE.HOVER_OUT].restart()
        },
      }),
      [TIMELINE.HOVER_OUT]: gsap.timeline({
        paused: true,
        repeatRefresh: true,
      }),
      [TIMELINE.HITBOX_IN]: gsap.timeline({
        paused: true,
        repeatRefresh: true,
        onComplete: () => {
          timelines[TIMELINE.HITBOX_OUT].restart()
        },
      }),
      [TIMELINE.HITBOX_OUT]: gsap.timeline({
        paused: true,
      }),
    }

    // todo: to utils -> generator function since we use it in multiple places below
    const skewXOut = R(-2, 2)
    const skewYOut = R(-2, 2)

    const scaleHoverIn = R(1, 1.3)
    const inDuration = R(0.3, 0.7)
    const inEase = 'power.in'

    const scaleHoverOut = 0
    const outDuration = R(0.5, 1.2)
    const outEase = 'sine.inOut'

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

    /* HOVER IN */
    registerHoverInTimeline({
      tile,
      timeline: timelines[TIMELINE.HOVER_IN],
      skewXOut,
      skewYOut,
      inDuration,
      inEase,
      scaleHoverIn,
    })

    /* HOVER OUT */
    registerHoverOutTimeline({
      tile,
      timeline: timelines[TIMELINE.HOVER_OUT],
      skewXOut,
      skewYOut,
      outDuration,
      outEase,
      scaleHoverOut,
    })

    /* QUICKSET POSITION */
    registerSetPosition({
      tile,
      inDuration,
      inEase,
      outDuration,
      outEase,
    })

    registerHitboxInTimeline({
      tile,
      timeline: timelines[TIMELINE.HITBOX_IN],
      inDuration,
      inEase,
      scaleIn: scaleHitboxIn,
    })

    registerHitboxOutTimeline({
      tile,
      timeline: timelines[TIMELINE.HITBOX_OUT],
      outDuration,
      outEase,
    })

    tiles[tile.id].timelines = timelines
  })
}
